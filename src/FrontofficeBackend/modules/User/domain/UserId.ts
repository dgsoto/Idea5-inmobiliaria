import { Uuid } from 'FrontofficeBackend/modules/Shared/infrastructure/services/Uuid';

export class UserId extends Uuid {
  constructor(value: string) {
    super(value);
    this.isValidUuid(value);
  }
}
