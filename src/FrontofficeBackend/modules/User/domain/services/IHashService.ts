export interface IHashService {
  hash(value: string): Promise<string>;
}
