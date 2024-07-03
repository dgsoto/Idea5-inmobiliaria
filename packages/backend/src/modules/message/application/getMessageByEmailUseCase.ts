import { IMessageRepository } from '../domain/IMessageRepository';
import { inject, injectable } from 'tsyringe';
import { Message } from '../domain/message';
@injectable()
export class GetMessageByEmailUseCase {
  private readonly _MessageRepository: IMessageRepository;
  constructor(@inject('messageRepository') messageRepository: IMessageRepository) {
    this._MessageRepository = messageRepository;
  }

  async run(email: string): Promise<Message[] | null> {
    const messages = await this._MessageRepository.getMessageByEmail(email);
    return messages;
  }
}
