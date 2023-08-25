using Azure;
using Azure.AI.OpenAI;
using ChatBot.Api.OpenAi.Configuration;
using ChatBot.Api.OpenAi.Models;
using Microsoft.Extensions.Options;

namespace ChatBot.Api.OpenAi;

internal class OpenAiService
{
    private readonly IOptionsMonitor<OpenAiOptions> _configuration;

    public OpenAiService(IOptionsMonitor<OpenAiOptions> options)
    {
        _configuration = options;
    }

    public async Task<CompletionResponseModel> CompleteAsync(CompletionRequestModel request)
    {
        var configuration = _configuration.CurrentValue;
        var client = GetClient();
        var messages = GetMessages(request.Messages);
        var response = await client.GetChatCompletionsAsync(
            configuration.DeploymentName,
            new ChatCompletionsOptions(messages)
            {
                Temperature = (float)0.7,
                MaxTokens = 800,
                NucleusSamplingFactor = (float)0.95,
                FrequencyPenalty = 0,
                PresencePenalty = 0,
            });
        ChatCompletions completions = response.Value;
        var text = completions.Choices[0].Message.Content;
        return new CompletionResponseModel
        {
            Message = new MessageModel
            {
                Type = MessageTypeModel.Assistant,
                Text = text
            }
        };
    }

    private IReadOnlyCollection<ChatMessage> GetMessages(List<MessageModel> messages)
    {
        List<ChatMessage> models = new()
        {
            new ChatMessage(ChatRole.System, @"")
        };
        foreach (var message in messages.TakeLast(10))
        {
            var roleModel = message.Type == MessageTypeModel.Assistant ? ChatRole.Assistant : ChatRole.User;
            var messageModel = new ChatMessage(roleModel, message.Text);
            models.Add(messageModel);
        }
        return models;
    }

    private OpenAIClient GetClient()
    {
        var configuration = _configuration.CurrentValue;
        return new OpenAIClient(
            new Uri(configuration.Endpoint),
            new AzureKeyCredential(configuration.ApiKey));
    }
}