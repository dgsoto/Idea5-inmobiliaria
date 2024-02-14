import { inject } from 'tsyringe';
import { InvalidArgumentError } from '../../Shared/domain/InvalidArgumentError';
import { StringValueObject } from '../../Shared/domain/StringValueObject';
import { IHashService } from './services/IHashService';

export class UserPassword extends StringValueObject {
  private hashedValue: string = '';

  constructor(
    value: string,
    @inject('HashService') private hashService: IHashService,
  ) {
    super(value);
    this.ensureLengthIsBetween8And100Characters(value);
  }

  async validate() {
    const hashedValue = await this.hashService.hash(this.getValue());
    this.hashedValue = hashedValue;
  }

  private ensureLengthIsBetween8And100Characters(value: string) {
    if (value.length < 8 || value.length > 100) {
      throw new InvalidArgumentError(`The 'Password' property: '<${value}>' must be between 8 and 100 characters`);
    }
  }

  getHashedValue(): string {
    return this.hashedValue;
  }

  static async createAndHash(value: string, hashService: IHashService): Promise<UserPassword> {
    const userPassword = new UserPassword(value, hashService);
    await userPassword.validate();
    return userPassword;
  }
}
