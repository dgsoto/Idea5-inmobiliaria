import 'reflect-metadata';
import { inject } from 'tsyringe';
import { invalidContentLength } from './Error/invalidContentLength';
import { IEncryptService } from './services/IEncryptService';

export class typeMessage {
  private Content: string;
  constructor(
    content: string,
    @inject('EncryptService') private readonly encryptService: IEncryptService,
  ) {
    this.Content = content;
    this.isValidContentLength(content);
    this.encryptMessage();
  }

  async encryptMessage(): Promise<typeMessage> {
    const encryptedMessage = await this.encryptService.encrypt(this.Content);
    return new typeMessage(encryptedMessage, this.encryptService);
  }
  async decryptMessage(): Promise<typeMessage> {
    const decryptedMessage = await this.encryptService.decrypt(this.Content);
    return new typeMessage(decryptedMessage, this.encryptService);
  }
  private isValidContentLength(content: string) {
    if (content.length > 1000) {
      throw new invalidContentLength('The content exceeds 1000 characters');
    }
  }
}
