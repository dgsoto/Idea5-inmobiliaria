import { InvalidArgumentError } from '../../Shared/domain/InvalidArgumentError';
import { StringValueObject } from '../../Shared/domain/StringValueObject';

export class UserEmail extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsValidEmail(value);
  }

  private ensureIsValidEmail(value: string) {
    if (!/^[a-zA-Z0-9._-]{3,}@(?!.*\.\.)[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,}$/.test(value)) {
      throw new InvalidArgumentError(`The 'Email' property: '${value}' must be a valid 'Email'`);
    }
  }
}
