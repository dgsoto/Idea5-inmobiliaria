import { BaseEntity } from '../../Shared/domain/BaseEntity';
import { hashPassword } from '../infrastructure/security/hashPassword';

export class User extends BaseEntity {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;

  constructor(id: string, firstname: string, lastname: string, email: string, password: string) {
    super(id);
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.encryptPassword(password);
  }

  async encryptPassword(password: string): Promise<void> {
    const hashedPassword = await hashPassword(password);
    this.password = hashedPassword;
  }
}
