import { InvalidArgumentError } from '../../Shared/domain/InvalidArgumentError';
import { StringValueObject } from '../../Shared/domain/StringValueObject';

export class PrivilegePath extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsValidPrivilegePath(value);
  }

  private ensureIsValidPrivilegePath(value: string) {
    if (value.length > 100 || value.length < 2) {
      throw new InvalidArgumentError(`The 'PrivilegePath' property: '${value}' must be between 2 and 100 characters`);
    }

    if (!/^[A-Za-záéíóúüÜñÑ/\s]+$/u.test(value)) {
      throw new InvalidArgumentError(`The 'PrivilegePath' property: '${value}' can only contain alphabetical characters, spaces, and accents.`);
    }
  }
}
