using System.Runtime.Serialization;

namespace ChatBot.Api.OpenAi.Configuration;

[DataContract]
public class CompletionOptions
{
    [DataMember(Name = "temperature")]
    public float Temperature { get; set; } = 0.7f;

    [DataMember(Name = "maxTokens")]
    public int MaxTokens { get; set; } = 800;

    [DataMember(Name = "topP")]
    public float TopP { get; set; } = 0.95f;

    [DataMember(Name = "frequencyPenalty")]
    public float FrequencyPenalty { get; set; } = 0;

    [DataMember(Name = "presencePenalty")]
    public float PresencePenalty { get; set; } = 0;
}