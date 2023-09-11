import { MessageTypeModel } from "./message-type.model";

export interface MessageModel {
  type: MessageTypeModel;
  text: string;
}
