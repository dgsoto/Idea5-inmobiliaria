import { IMessageRepository } from '../domain/IMessageRepository';
import { inject, injectable } from 'tsyringe';
import { Message } from '../domain/message';

@injectable()
export class GetMessageByContentUseCase {
  private readonly _MessageRepository: IMessageRepository;
  constructor(@inject('messageRepository') messageRepository: IMessageRepository) {
    this._MessageRepository = messageRepository;
  }

  async run(content: string): Promise<Message[] | null> {
    const messages = await this._MessageRepository.getMessageByContent(content);
    return messages;
  }
}
