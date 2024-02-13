import { InvalidArgumentError } from 'FrontofficeBackend/modules/Shared/domain/InvalidArgumentError';
import { StringValueObject } from 'FrontofficeBackend/modules/Shared/domain/StringValueObject';
import { inject } from 'tsyringe';
import { IHashService } from './services/IHashService';

export class UserPassword extends StringValueObject {
  constructor(
    value: string,
    @inject('HashService') private hashService: IHashService,
  ) {
    super(value);
    this.ensureLengthIsBetween8And100Characters(value);
    this.generateHash();
  }

  private ensureLengthIsBetween8And100Characters(value: string) {
    if (value.length < 8 || value.length > 100) {
      throw new InvalidArgumentError(`The 'Password' property: '<${value}>' must be between 8 and 100 characters`);
    }
  }

  private async generateHash() {
    const currentValue = this.getValue();
    const hashedValue = await this.hashService.hash(currentValue);
    this.setValue(hashedValue);
  }
}
