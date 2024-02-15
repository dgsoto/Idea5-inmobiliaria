import { injectable } from 'tsyringe';
import argon2 from 'argon2';
import { IHashService } from '../../domain/services/IHashService';

const SALT = 'ImnoBopl';
const CONFIG = {
  type: argon2.argon2id,
  memoryCost: 1024 * 64,
  timeCost: 3,
  parallelism: 1,
};

@injectable()
export class HashService implements IHashService {
  async hash(password: string): Promise<string> {
    return argon2.hash(password, { ...CONFIG, salt: Buffer.from(SALT) });
  }
}
