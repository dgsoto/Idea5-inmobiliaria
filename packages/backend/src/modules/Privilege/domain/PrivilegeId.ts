import { Uuid } from '../../Shared/infrastructure/services/Uuid';

export class PrivilegeId extends Uuid {
  constructor(value: string) {
    super(value);
    this.isValidUuid(value);
  }
}
