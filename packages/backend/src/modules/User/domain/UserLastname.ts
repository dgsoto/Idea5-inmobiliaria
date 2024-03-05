import { StringValueObject } from '../../Shared/domain/StringValueObject';
import { InvalidArgumentError } from '../../Shared/domain/InvalidArgumentError';

export class UserLastname extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsValidLastname(value);
  }

  private ensureIsValidLastname(value: string) {
    if (value.length > 50 || value.length < 2) {
      throw new InvalidArgumentError(`The 'Lastname' property: '${value}' must be between 2 and 50 characters`);
    }

    if (!/^[A-Za-záéíóúüÜñÑ\s]+$/u.test(value)) {
      throw new InvalidArgumentError(`The 'Lastname' property: '${value}' can only contain alphabetical characters, spaces, and accents.`);
    }
  }
}
