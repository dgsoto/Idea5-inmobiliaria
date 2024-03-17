import { Uuid } from 'src/modules/Shared/infrastructure/services/Uuid';
export class MessageId extends Uuid {
  constructor(value: string) {
    super(value);
    this.isValidUuid(value);
  }
}
