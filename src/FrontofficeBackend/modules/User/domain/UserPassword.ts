import 'reflect-metadata';
import { inject } from 'tsyringe';
import { InvalidArgumentError } from '../../Shared/domain/InvalidArgumentError';
import { StringValueObject } from '../../Shared/domain/StringValueObject';
import { IHashService } from './services/IHashService';

export class UserPassword extends StringValueObject {
  constructor(
    value: string,
    @inject('HashService') private readonly hashService: IHashService,
  ) {
    super(value);
    this.ensureLengthIsBetween8And100Characters(value);
    this.validate();
  }

  async validate(): Promise<UserPassword> {
    const hashedValue = await this.hashService.hash(this.getValue());
    this.setValue(hashedValue);
    return this;
  }

  private ensureLengthIsBetween8And100Characters(value: string) {
    if (value.length < 8 || value.length > 100) {
      throw new InvalidArgumentError(`The 'Password' property: '<${value}>' must be between 8 and 100 characters`);
    }
  }

  static async createAndHash(value: string, hashService: IHashService): Promise<UserPassword> {
    const userPassword = new UserPassword(value, hashService);
    await userPassword.validate();
    return userPassword;
  }
}
