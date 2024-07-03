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

import { GetMessagesUseCase } from './application/getMessagesUseCase';
import { GetMessageByContentController } from './infraestructure/api/getMessageByContentController';
//import { ReplyMessageController } from './infraestructure/api/replyMessageController';
import { GetMessagesController } from './infraestructure/api/getMessagesController';
import { ReadMessageUseCase } from './application/readMessageUseCase';
import { DeleteMessageUseCase } from './application/deleteMessageUsecase';
import { GetMessageByEmailUseCase } from './application/getMessageByEmailUseCase';
import { GetMessagesByEmailController } from './infraestructure/api/getMessageByEmailController';
import { GetMessageByContentUseCase } from './application/getMessageByContentUseCase';
import { GetReceivedMessagesUseCase } from './application/getReceivedMessagesUseCase';
import { GetReceivedMessagesController } from './infraestructure/api/getReceivedMessagesController';
import { GetSentMessagesUseCase } from './application/getSentMessagesUseCase';
import { GetSentMessagesController } from './infraestructure/api/getSentMessagesController';

container.register<IMessageRepository>('messageRepository', { useClass: messageRepositoryPrisma });
container.register<IEncryptService>('EncryptService', { useClass: EncryptService });

container.register('ReadMessaUseCase', { useClass: ReadMessageUseCase });
container.register<IController>('ReadMessageController', { useClass: ReadMessageController });

container.register('DeleteMessageUseCase', { useClass: DeleteMessageUseCase });
container.register<IController>('DeleteMessageController', { useClass: DeleteMessageController });

container.register('CreateMessageUseCase', { useClass: CreateMessageUseCase });
container.register<IController>('CreateMessageController', { useClass: CreateMessageController });

container.register('GetMessagesUseCase', { useClass: GetMessagesUseCase });
container.register<IController>('GetMessagesController', { useClass: GetMessagesController });

container.register('GetMessageByEmailUseCase', { useClass: GetMessageByEmailUseCase });
container.register<IController>('GetMessageByEmailController', { useClass: GetMessagesByEmailController });

container.register('GetMessageByContentUseCase', { useClass: GetMessageByContentUseCase });
container.register<IController>('GetMessageByContentController', { useClass: GetMessageByContentController });

container.register('GetReceivedMessagesUseCase', { useClass: GetReceivedMessagesUseCase });
container.register<IController>('GetReceivedMessagesController', { useClass: GetReceivedMessagesController });

container.register('GetSentMessagesUseCase', { useClass: GetSentMessagesUseCase });
container.register<IController>('GetSentMessagesController', { useClass: GetSentMessagesController });

//container.register<IController>('ReplyMessageController', { useClass: ReplyMessageController });
export { container as messageContainer };
