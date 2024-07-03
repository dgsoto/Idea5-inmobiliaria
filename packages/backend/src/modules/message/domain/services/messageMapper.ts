import { UserEmail } from 'src/modules/User/domain/UserEmail';
import { UserPhone } from 'src/modules/User/domain/UserPhone';
import { typeSubject } from '../../domain/typeSubject';
import { typeMessage } from '../../domain/typeMessage';
import { MessageId } from '../../domain/messageId';
import { Message } from '../../domain/message';
import { container } from 'tsyringe';

export async function createTypeMessageFromData(messageData: any): Promise<Message> {
  const email = new UserEmail(messageData.email ?? '');
  const cellPhone = new UserPhone(messageData.cell_phone ?? '');
  const subject = new typeSubject(messageData.subjet ?? '');
  let decryptedMessage: typeMessage;

  if (messageData.message) {
    try {
      decryptedMessage = await new typeMessage(messageData.message, container.resolve('EncryptService')).decryptMessage();
    } catch (error) {
      decryptedMessage = new typeMessage('Encrypted Message', container.resolve('EncryptService'));
    }
  } else {
    decryptedMessage = new typeMessage(' ', container.resolve('EncryptService'));
  }

  return new Message(new MessageId(messageData.id), messageData.user_id, email, cellPhone, subject, decryptedMessage);
}
