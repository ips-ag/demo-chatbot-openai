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
                Temperature = configuration.CompletionOptions.Temperature,
                MaxTokens = configuration.CompletionOptions.MaxTokens,
                NucleusSamplingFactor = configuration.CompletionOptions.TopP,
                FrequencyPenalty = configuration.CompletionOptions.FrequencyPenalty,
                PresencePenalty = configuration.CompletionOptions.PresencePenalty,
            });
        ChatCompletions completions = response.Value;
        var text = completions.Choices.First().Message.Content;
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
            new ChatMessage(
                ChatRole.System,
                """
                * You are an IPS Software Vietnam chatbot Clara, your primary goal is to answer questions about Vietnam software company IPS Software Vietnam.
                * Answer any question briefly, profesionally, but a bit informal.
                * Answer truthfully, based on your current knowledge about IPS Software Vietnam company and include context found bellow.
                * Do not answer questions that are not related to IPS Software Vietnam. In this case, you can answer "I can only answer questions related to IPS Software Vietnam".
                * If you dont know the answer, direct the user to e-mail address info@ips-ag.com.
                * Introduce yourself at the beggining.

                Information about IPS Software Vietnam:
                * IPS Software Vietnam is a software company based in Da Nang, Vietnam.
                * IPS Software Vietnam is a subsidiary of IPS Solutions, a German owned company.
                * IPS Solutions has development centers in Czech Republic and Vietnam.
                """)
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