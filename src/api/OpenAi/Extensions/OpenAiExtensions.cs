using ChatBot.Api.OpenAi.Configuration;

namespace ChatBot.Api.OpenAi.Extensions;

public static class OpenAiExtensions
{
    public static IServiceCollection AddOpenAi(this IServiceCollection services)
    {
        services.AddOptions<OpenAiOptions>()
            .BindConfiguration(OpenAiOptions.SectionName)
            .ValidateDataAnnotations();
        services.AddSingleton<OpenAiService>();
        return services;
    }
}
