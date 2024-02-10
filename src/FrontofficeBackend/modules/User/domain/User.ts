import { BaseEntity } from '../../Shared/domain/BaseEntity';
import { hashPassword } from '../infrastructure/security/hashPassword';

export class User extends BaseEntity {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;

  constructor(id: string, firstname: string, lastname: string, email: string, hashedPassword: string) {
    super(id);
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = hashedPassword;
  }

  static async create(id: string, firstname: string, lastname: string, email: string, password: string): Promise<User> {
    const hashedPassword = await hashPassword(password);
    return new User(id, firstname, lastname, email, hashedPassword);
  }
}
