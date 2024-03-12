import { InvalidArgumentError } from '../../Shared/domain/InvalidArgumentError';
import { StringValueObject } from '../../Shared/domain/StringValueObject';

export class RoleState extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsValidRoleState(value);
  }

  private ensureIsValidRoleState(value: string) {
    if (!['Active', 'Inactive'].includes(value)) {
      throw new InvalidArgumentError(`The 'RoleState' property: '${value}' must be either 'Active' or 'Inactive'`);
    }
  }
}
