import { InvalidArgumentError } from '../../Shared/domain/InvalidArgumentError';
import { StringValueObject } from '../../Shared/domain/StringValueObject';

export class PrivilegeState extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsValidPrivilegeState(value);
  }

  private ensureIsValidPrivilegeState(value: string) {
    if (!['Active', 'Inactive'].includes(value)) {
      throw new InvalidArgumentError(`The 'PrivilegeState' property: '${value}' must be either 'Active' or 'Inactive'`);
    }
  }
}
