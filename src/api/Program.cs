using ChatBot.Api.OpenAi;
using ChatBot.Api.OpenAi.Extensions;
using ChatBot.Api.OpenAi.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOpenAi();
builder.Services.AddCors();

var app = builder.Build();

app.MapPost("/completions", async (CompletionRequest request, OpenAiService service) =>
{
	return await service.CompleteAsync(request);
});

app.UseCors(builder => builder
	.AllowAnyOrigin()
	.AllowAnyMethod()
	.AllowAnyHeader()
	.SetIsOriginAllowed(_ => true));

app.Run();