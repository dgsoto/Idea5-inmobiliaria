import argon2 from 'argon2';

const SALT = 'ImnoBopl';
const CONFIG = {
  type: argon2.argon2id,
  memoryCost: 1024 * 64,
  timeCost: 3,
  parallelism: 1,
};

export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, { ...CONFIG, salt: Buffer.from(SALT) });
}
