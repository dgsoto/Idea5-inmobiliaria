import { InvalidArgumentError } from '../../Shared/domain/InvalidArgumentError';
import { StringValueObject } from '../../Shared/domain/StringValueObject';

export class RoleName extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsValidRoleName(value);
  }

  private ensureIsValidRoleName(value: string) {
    if (value.length > 50 || value.length < 2) {
      throw new InvalidArgumentError(`The 'RoleName' property: '${value}' must be between 2 and 50 characters`);
    }

    if (!/^[A-Za-záéíóúüÜñÑ\s]+$/u.test(value)) {
      throw new InvalidArgumentError(`The 'RoleName' property: '${value}' can only contain alphabetical characters, spaces, and accents.`);
    }
  }
}
