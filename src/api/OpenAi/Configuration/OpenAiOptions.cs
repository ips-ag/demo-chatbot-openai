using System.ComponentModel.DataAnnotations;

namespace ChatBot.Api.OpenAi.Configuration;

public class OpenAiOptions
{
    public static string SectionName => "Azure:OpenAI";

    [Required]
    public required string ApiKey { get; set; }

    [Required]
    public required string Endpoint { get; set; }

    [Required]
    public required string DeploymentName { get; set; }
}