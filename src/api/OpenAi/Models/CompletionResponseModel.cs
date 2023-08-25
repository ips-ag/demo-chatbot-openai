using System.Text.Json.Serialization;

namespace ChatBot.Api.OpenAi.Models;

public class CompletionResponseModel
{
    [JsonPropertyName("message")]
    public required MessageModel Message { get; set; }
}