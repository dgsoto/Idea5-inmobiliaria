import { faker } from '@faker-js/faker';
import { ICreateUserRequest } from '../../../../../src/FrontofficeBackend/modules/User/application/create/ICreateUserRequest';
import { UserEmail } from '../../../../../src/FrontofficeBackend/modules/User/domain/UserEmail';
import { UserFirstname } from '../../../../../src/FrontofficeBackend/modules/User/domain/UserFirstname';
import { UserId } from '../../../../../src/FrontofficeBackend/modules/User/domain/UserId';
import { UserLastname } from '../../../../../src/FrontofficeBackend/modules/User/domain/UserLastname';
import { UserPassword } from '../../../../../src/FrontofficeBackend/modules/User/domain/UserPassword';
import { UserPhone } from '../../../../../src/FrontofficeBackend/modules/User/domain/UserPhone';
import { container } from '../../../../../src/FrontofficeBackend/app/container';

export class CreateUserMother {
  static create(
    id: UserId,
    firstname: UserFirstname,
    lastname: UserLastname,
    email: UserEmail,
    password: UserPassword,
    phone: UserPhone,
  ): ICreateUserRequest {
    return {
      id: id.value,
      firstname: firstname.getValue(),
      lastname: lastname.getValue(),
      email: email.getValue(),
      password: password.getValue(),
      phone: phone.getValue(),
    };
  }
  static async random(): Promise<ICreateUserRequest> {
    const hashedPassword = await new UserPassword(faker.internet.password(), container.resolve('HashService')).validate();
    return this.create(
      new UserId(faker.string.uuid()),
      new UserFirstname(faker.person.firstName()),
      new UserLastname(faker.person.lastName()),
      new UserEmail(faker.internet.email()),
      hashedPassword,
      new UserPhone(faker.string.numeric('##########')),
    );
  }
}
