import { InvalidArgumentError } from 'FrontofficeBackend/modules/Shared/domain/InvalidArgumentError';
import { StringValueObject } from 'FrontofficeBackend/modules/Shared/domain/StringValueObject';

export class UserPhone extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsValidPhone(value);
  }

  private ensureIsValidPhone(value: string) {
    if (!/^\d{10}$/.test(value)) {
      console.log(value);
      throw new InvalidArgumentError(`The 'Phone' property: '<${value}>' must be a valid 'Phone'`);
    }
  }
}
