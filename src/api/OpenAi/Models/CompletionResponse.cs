using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace ChatBot.Api.OpenAi.Models;

[DataContract]
public class CompletionResponse
{
    [Required]
    public required string Message { get; set; }
}