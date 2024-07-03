import { IMessageRepository } from '../domain/IMessageRepository';
import { inject, injectable } from 'tsyringe';
import { Message } from '../domain/message';
@injectable()
export class GetSentMessagesUseCase {
  private readonly _MessageRepository: IMessageRepository;
  constructor(@inject('messageRepository') messageRepository: IMessageRepository) {
    this._MessageRepository = messageRepository;
  }

  async run(user_id: string): Promise<Message[] | null> {
    const messages = await this._MessageRepository.getSentMessages(user_id);
    return messages;
  }
}
