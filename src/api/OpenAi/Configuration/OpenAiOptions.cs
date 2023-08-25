using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace ChatBot.Api.OpenAi.Configuration;

[DataContract]
public class OpenAiOptions
{
    public static string SectionName => "Azure:OpenAI";

    [DataMember(Name = "apiKey")]
    [Required]
    public required string ApiKey { get; set; }

    [DataMember(Name = "endpoint")]
    [Required]
    public required string Endpoint { get; set; }

    [DataMember(Name = "deploymentName")]
    [Required]
    public required string DeploymentName { get; set; }

    [DataMember(Name = "completion")]
    public CompletionOptions CompletionOptions { get; set; } = new();
}
