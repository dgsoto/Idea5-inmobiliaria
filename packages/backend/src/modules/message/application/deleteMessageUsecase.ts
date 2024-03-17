import { IMessageRepository } from '../domain/IMessageRepository';
import { inject, injectable } from 'tsyringe';
@injectable()
export class DeleteMessageUseCase {
  private readonly _MessageRepository: IMessageRepository;

  constructor(@inject('messageRepository') messageRepository: IMessageRepository) {
    this._MessageRepository = messageRepository;
  }

  async run(id: string): Promise<void> {
    await this._MessageRepository.deleteMessage(id);
  }
}
