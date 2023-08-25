import { MessageModel } from './message-model';

export interface CompletionRequestModel {
  messages: MessageModel[];
}
