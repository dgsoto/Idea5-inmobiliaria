import { Uuid } from '../../Shared/infrastructure/services/Uuid';

export class UserId extends Uuid {
  constructor(value: string) {
    super(value);
    this.isValidUuid(value);
  }
}
