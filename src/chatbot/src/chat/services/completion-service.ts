import { CompletionRequest, CompletionResponse } from "./models";

export async function getCompletion(message: string): Promise<string> {
  const requestModel: CompletionRequest = {
    message: message,
  };
  const response = await fetch("http://localhost:5000/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestModel),
  });
  if (!response.ok) {
    throw new Error(`Failed to get completions: ${response.statusText}`);
  }
  const completions = (await response.json()) as CompletionResponse;
  return completions.message;
}
