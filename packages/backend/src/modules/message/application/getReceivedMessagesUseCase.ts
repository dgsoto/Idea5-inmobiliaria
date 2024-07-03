import { IMessageRepository } from '../domain/IMessageRepository';
import { inject, injectable } from 'tsyringe';
import { Message } from '../domain/message';
@injectable()
export class GetReceivedMessagesUseCase {
  private readonly _MessageRepository: IMessageRepository;
  constructor(@inject('messageRepository') messageRepository: IMessageRepository) {
    this._MessageRepository = messageRepository;
  }

  async run(userEmail: string): Promise<Message[] | null> {
    const messages = await this._MessageRepository.getReceivedMessages(userEmail);
    return messages;
  }
}
