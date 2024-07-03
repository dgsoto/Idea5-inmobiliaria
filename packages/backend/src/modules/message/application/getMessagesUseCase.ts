import { IMessageRepository } from '../domain/IMessageRepository';
import { inject, injectable } from 'tsyringe';
import { Message } from '../domain/message';

@injectable()
export class GetMessagesUseCase {
  private readonly _MessageRepository: IMessageRepository;

  constructor(@inject('messageRepository') messageRepository: IMessageRepository) {
    this._MessageRepository = messageRepository;
  }

  async run(user_id: string, email: string): Promise<Message[] | null> {
    const messages: Message[] | null = await this._MessageRepository.getMessages(user_id, email);
    if (!messages) {
      return [];
    }
    return messages;
  }
}
