using System.Text.Json.Serialization;

namespace ChatBot.Api.OpenAi.Models;

public class CompletionRequestModel
{
    [JsonPropertyName("messages")]
    public required List<MessageModel> Messages { get; set; }
}
