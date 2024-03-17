//aca estara la operacion de prisma.create message - la logica

import { PrismaClient } from '@prisma/client';
import { IMessageRepository } from '../../domain/IMessageRepository';
import { validateAdresseRol } from '../../domain/services/validateAdresseeRol';
import { InputRolError } from '../../domain/Error/InputRolError';
import { Message } from '../../domain/message';
import { container, injectable } from 'tsyringe';
import { typeMessage } from '../../domain/typeMessage';
import { MessageId } from '../../domain/messageId';
import { typeSubject } from '../../domain/typeSubject';
import { UserEmail } from 'src/modules/User/domain/UserEmail';
import { UserPhone } from 'src/modules/User/domain/UserPhone';
import { Message } from '../../domain/message';

export class messageRepositoryPrisma implements IMessageRepository {
  constructor(private prisma: PrismaClient) {}

  async createMessage(newMessage: Message): Promise<void> {
    try {
      const remitente = await this.prisma.user.findFirst({ where: { id: newMessage.user_id.toString() } });
      const destinatario = await this.prisma.user.findFirst({ where: { email: newMessage.email.toString() } });
      if (!remitente || !destinatario) {
        throw new Error('Usuario no autenticado o no encontrado.');
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

      if (!messageData) {
        throw new Error('El mensaje no fue encontrado');
      }

      return messageData
        ? new Message(
            new MessageId(messageData.id),
            messageData.user_id,
            new UserEmail(messageData.email),
            new UserPhone(messageData.cell_phone),
            new typeSubject(messageData.subjet),
            await new typeMessage(messageData?.message, container.resolve('EncryptService')).decryptMessage(),
          )
        : null;
    } catch (error) {
      throw new Error(`Error al leer el mensaje: ${error.message}`);
    }
  }

  async deleteMessage(id: string): Promise<void> {
    try {
      const messageToDelete = await this.prisma.message.findUnique({ where: { id: id } });

      if (!messageToDelete) {
        throw new Error('El mensaje no fue encontrado');
      }

      await this.prisma.message.delete({ where: { id: id } });
    } catch (error) {
      throw new Error(`Error al eliminar el recurso`, error);
    }
  }
  /*async replyMessage(content: string): Promise<void> {}
  async sendMessage(): Promise<void> {}
  async getMessages(email: string): Promise<message[]> {}*/
}
