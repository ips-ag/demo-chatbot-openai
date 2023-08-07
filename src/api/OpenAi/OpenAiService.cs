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

    public async Task<CompletionResponse> CompleteAsync(CompletionRequest request)
    {
        var configuration = _configuration.CurrentValue;
        var client = GetClient();
        var response = await client.GetChatCompletionsAsync(
            configuration.DeploymentName,
            new ChatCompletionsOptions()
            {
                Messages =
                {
                    new ChatMessage(ChatRole.System, @""),
                    new ChatMessage(ChatRole.User, request.Message),
                },
                Temperature = (float)0.7,
                MaxTokens = 800,
                NucleusSamplingFactor = (float)0.95,
                FrequencyPenalty = 0,
                PresencePenalty = 0,
            });
        ChatCompletions completions = response.Value;
        var msg = completions.Choices[0].Message.Content;
        return new CompletionResponse { Message = msg };
    }

    private OpenAIClient GetClient()
    {
        var configuration = _configuration.CurrentValue;
        return new OpenAIClient(
            new Uri(configuration.Endpoint),
            new AzureKeyCredential(configuration.ApiKey));
    }
}