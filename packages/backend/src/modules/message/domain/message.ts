import { UserEmail } from 'src/modules/User/domain/UserEmail';
import { UserPhone } from 'src/modules/User/domain/UserPhone';
import { typeMessage } from './typeMessage';
import { typeSubject } from './typeSubject';
import { MessageId } from './messageId';

export class Message {
  id: MessageId;
  user_id: string; //el redactor
  email: UserEmail; //destinatario
  cellphone: UserPhone;
  subject: typeSubject; //temario
  message: typeMessage; //contenido

  constructor(id: MessageId, user_id: string, email: UserEmail, cellphone: UserPhone, subject: typeSubject, message: typeMessage) {
    this.id = id;
    this.user_id = user_id;
    this.email = email;
    this.cellphone = cellphone;
    this.subject = subject;
    this.message = message;
  }

  static async create(
    id: MessageId,
    user_id: string,
    email: UserEmail,
    cellphone: UserPhone,
    subject: typeSubject,
    message: typeMessage,
  ): Promise<Message> {
    return new Message(id, user_id, email, cellphone, subject, message);
  }
}
