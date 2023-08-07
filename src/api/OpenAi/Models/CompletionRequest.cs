using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace ChatBot.Api.OpenAi.Models;

[DataContract]
public class CompletionRequest
{
    [Required]
    public required string Message { get; set; }
}
