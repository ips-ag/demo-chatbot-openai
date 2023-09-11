using System.Text.Json.Serialization;

namespace ChatBot.Api.OpenAi.Models;

public class MessageModel
{
    [JsonPropertyName("type")]
    public required MessageTypeModel Type { get; set; }

    [JsonPropertyName("text")]
    public required string Text { get; set; }
}
