export interface IUuid {
  generate(): string;
  isValidUuid(uuid: string): void;
}
