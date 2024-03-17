import { container } from 'tsyringe';
import { CreateMessageController } from './infraestructure/api/createMessageController';
import { IController } from '../Shared/infrastructure/api/IController';
import { CreateMessageUseCase } from './application/createMessage/createMessageUseCase';
import { IMessageRepository } from './domain/IMessageRepository';
import { messageRepositoryPrisma } from './infraestructure/persistence/messageRepository';
import { EncryptService } from './infraestructure/security/EncryptService';
import { IEncryptService } from './domain/services/IEncryptService';
import { ReadMessageController } from './infraestructure/api/readMessageController';
import { DeleteMessageController } from './infraestructure/api/deleteMessageController';

container.register<IMessageRepository>('messageRepository', { useClass: messageRepositoryPrisma });
container.register('CreateMessageUseCase', { useClass: CreateMessageUseCase });
container.register<IController>('CreateMessageController', { useClass: CreateMessageController });
container.register<IEncryptService>('EncryptService', { useClass: EncryptService });
container.register<IController>('ReadMessageController', { useClass: ReadMessageController });
container.register<IController>('DeleteMessageController', { useClass: DeleteMessageController });
export { container as messageContainer };
