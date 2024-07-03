import { Message } from './message';
export interface IMessageRepository {
  createMessage: (newMessage: Message) => Promise<void>;
  readMessage: (id: string) => Promise<Message | null>;
  deleteMessage: (id: string, email: string) => Promise<void>;

  getMessages: (user_id: string, email: string) => Promise<Message[] | null>;
  getReceivedMessages: (userEmail: string) => Promise<Message[] | null>;
  getSentMessages: (user_id: string) => Promise<Message[] | null>;
  getMessageByEmail: (email: string) => Promise<Message[] | null>;
  getMessageByContent: (phrase: string) => Promise<Message[] | null>;

  //replyMessage: (newMessage: Message) => Promise<void>;
}
