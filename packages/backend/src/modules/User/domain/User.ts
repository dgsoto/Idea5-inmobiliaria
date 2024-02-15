import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { UserEmail } from './UserEmail';
import { UserFirstname } from './UserFirstname';
import { UserId } from './UserId';
import { UserLastname } from './UserLastname';
import { UserPassword } from './UserPassword';
import { UserPhone } from './UserPhone';

export class User extends AggregateRoot {
  id: UserId;
  firstname: UserFirstname;
  lastname: UserLastname;
  email: UserEmail;
  password: UserPassword;
  phone: UserPhone;

  constructor(id: UserId, firstname: UserFirstname, lastname: UserLastname, email: UserEmail, hashedPassword: UserPassword, phone: UserPhone) {
    super();
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = hashedPassword;
    this.phone = phone;
  }

  static async create(
    id: UserId,
    firstname: UserFirstname,
    lastname: UserLastname,
    email: UserEmail,
    password: UserPassword,
    phone: UserPhone,
  ): Promise<User> {
    return new User(id, firstname, lastname, email, password, phone);
  }

  toPrimitives() {
    throw new Error('Method not implemented.');
  }
}
