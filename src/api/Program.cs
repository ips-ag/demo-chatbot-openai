using System.Text.Json;
using System.Text.Json.Serialization;
using ChatBot.Api.OpenAi;
using ChatBot.Api.OpenAi.Extensions;
using ChatBot.Api.OpenAi.Models;
using Microsoft.AspNetCore.Http.Json;

var builder = WebApplication.CreateBuilder(args);
builder.Services.Configure<JsonOptions>(
	options => options.SerializerOptions.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.CamelCase)));
builder.Services.AddOpenAi();
builder.Services.AddCors();

var app = builder.Build();

app.MapPost("/completions", async (CompletionRequestModel request, OpenAiService service) =>
{
	return await service.CompleteAsync(request);
});

app.UseCors(builder => builder
	.AllowAnyOrigin()
	.AllowAnyMethod()
	.AllowAnyHeader()
	.SetIsOriginAllowed(_ => true));

app.Run();