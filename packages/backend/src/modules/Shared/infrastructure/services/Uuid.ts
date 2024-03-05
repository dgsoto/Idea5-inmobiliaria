import { v4 as uuidv4, validate } from 'uuid';
import { IUuid } from '../../domain/IUuid';
import { InvalidArgumentError } from '../../domain/InvalidArgumentError';

export class Uuid implements IUuid {
  readonly value: string;

  constructor(value: string) {
    this.isValidUuid(value);
    this.value = value;
  }
  generate(): string {
    return uuidv4();
  }

  isValidUuid(uuid: string): void {
    if (!validate(uuid)) {
      throw new InvalidArgumentError(`The 'Id' property: '${uuid}' must be a valid 'Uuid'`);
    }
  }
}
