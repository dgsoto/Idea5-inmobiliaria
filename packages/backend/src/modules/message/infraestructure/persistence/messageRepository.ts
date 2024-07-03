//aca estara la operacion de prisma.create message - la logica

import { PrismaClient } from '@prisma/client';
import { IMessageRepository } from '../../domain/IMessageRepository';
import { validateAdresseRol } from '../../domain/services/validateAdresseeRol';
import { InputRolError } from '../../domain/Error/InputRolError';
import { injectable } from 'tsyringe';
import { Message } from '../../domain/message';
import { NotFound } from '../../domain/Error/notFound';
import { createTypeMessageFromData } from '../../domain/services/messageMapper';

@injectable()
export class messageRepositoryPrisma implements IMessageRepository {
  constructor(private prisma: PrismaClient) {}

  async createMessage(newMessage: Message): Promise<void> {
    try {
      const remitente = await this.prisma.user.findFirst({ where: { id: newMessage.user_id.toString() } });
      const destinatario = await this.prisma.user.findFirst({ where: { email: newMessage.email.toString() } });
      if (!remitente || !destinatario) {
        throw new NotFound('Usuario');
      }
      const destinatarioRolId = destinatario?.user_type ?? '';
      const remitenteRolId = remitente?.user_type ?? '';

      const validacion = await validateAdresseRol(destinatarioRolId, remitenteRolId);

      if (validacion) {
        await this.prisma.message.create({
          data: {
            id: newMessage.id.value,
            user_id: newMessage.user_id.toString(),
            email: newMessage.email.toString(),
            cell_phone: newMessage.cellphone.toString(),
            subjet: newMessage.subject.toString(),
            message: newMessage.message.toString(),
          },
        });
      } else {
        throw new InputRolError();
      }
    } catch (error) {
      console.error('Error al crear mensaje', error);
    }
  }

  async readMessage(id: string): Promise<Message | null> {
    try {
      const messageData = await this.prisma.message.findUnique({ where: { id: id } });

      return messageData ? createTypeMessageFromData(messageData) : null;
    } catch (error) {
      throw error;
    }
  }

  async deleteMessage(id: string, userEmail: string): Promise<void> {
    try {
      const messageToDelete = await this.prisma.message.findUnique({ where: { id: id } });
      if (userEmail === messageToDelete?.email) {
        messageToDelete.email = '';
        await this.prisma.message.update({
          where: { id: id },
          data: messageToDelete,
        });
      } else {
        await this.prisma.message.update({
          where: { id: id },
          data: {
            user_id: ' ',
          },
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async getMessages(user_id: string, userEmail: string): Promise<Message[] | null> {
    try {
      const receivedMessages = await this.getReceivedMessages(userEmail);
      const sentMessages = await this.getSentMessages(user_id);

      if (!receivedMessages && !sentMessages) {
        return null;
      }

      // Combinar los mensajes recibidos y enviados en una lista única
      const allMessages: Message[] = [];
      if (sentMessages) {
        allMessages.push(...sentMessages);
      }

      if (receivedMessages) {
        allMessages.push(...receivedMessages);
      }

      return allMessages;
    } catch (error) {
      return [];
    }
  }
  async getReceivedMessages(userEmail: string): Promise<Message[] | null> {
    try {
      const messagesData = await this.prisma.message.findMany({ where: { email: userEmail } });

      if (!messagesData) {
        return null;
      }
      const messagesPromises = messagesData.map(async (messageData) => createTypeMessageFromData(messageData));
      const messages = await Promise.all(messagesPromises);
      return messages;
    } catch (error) {
      throw Error;
    }
  }

  async getSentMessages(user_id: string): Promise<Message[] | null> {
    try {
      const messagesData = await this.prisma.message.findMany({ where: { user_id: user_id } });
      if (!messagesData) {
        return null;
      }

      const messagesPromises = messagesData.map(async (messageData) => createTypeMessageFromData(messageData));
      const messages = await Promise.all(messagesPromises);
      return messages;
    } catch (error) {
      throw Error;
    }
  }

  async getMessageByEmail(email: string): Promise<Message[] | null> {
    try {
      const messagesData = await this.prisma.message.findMany({ where: { email: email } });

      if (!messagesData) {
        return null;
      }

      const messagesPromises = messagesData.map(async (messageData) => createTypeMessageFromData(messageData));
      const messages = await Promise.all(messagesPromises);
      return messages;
    } catch (error) {
      throw Error;
    }
  }

  async getMessageByContent(phrase: string): Promise<Message[] | null> {
    try {
      const messagesData = await this.prisma.message.findMany({
        where: {
          OR: [{ message: { contains: phrase } }, { subjet: { contains: phrase } }],
        },
      });
      if (!messagesData) {
        return null;
      }
      const messagesPromises = messagesData.map(async (messageData) => createTypeMessageFromData(messageData));
      const messages = await Promise.all(messagesPromises);
      return messages;
    } catch (error) {
      throw Error;
    }
  }

  //async replyMessage(): Promise<void> {}
}
