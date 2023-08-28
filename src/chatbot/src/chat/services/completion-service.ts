import { Message, MessageType } from '../components/History';
import { CompletionRequestModel, CompletionResponseModel, MessageTypeModel } from './models';

export async function getCompletion(messages: Message[] = []): Promise<string> {
  const requestModel: CompletionRequestModel = toModel(messages);
  const endpoint = `${process.env.REACT_APP_API_URL}/completions`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestModel),
  });
  if (!response.ok) {
    throw new Error(`Failed to get completions: ${response.statusText}`);
  }
  const completions = (await response.json()) as CompletionResponseModel;
  return completions.message.text;
}

function toModel(messages: Message[]): CompletionRequestModel {
  return {
    messages: messages.map((message) => ({
      type: message.type === MessageType.User ? MessageTypeModel.User : MessageTypeModel.Assistant,
      text: message.text,
    })),
  };
}
