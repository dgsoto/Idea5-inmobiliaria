import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { inject, injectable } from 'tsyringe';
import { IAuthRepository } from '../domain/interfaces/auth.interface';
import { NotMatchedPasswordError } from './errors/NotMatchedPassError';
import { NotExistEmailError } from './errors/NotExistEmailError';
import { Auth } from '../domain/auth';
@injectable()
export class LoginUseCase {
  private readonly _repository: IAuthRepository;
  constructor(@inject('AuthRepository') authRepository: IAuthRepository) {
    this._repository = authRepository;
  }

  public async login(email: string, password: string): Promise<Auth> {
    const user = await this._repository.getByEmail(email);
    if (!user) throw new NotExistEmailError();

    const isMatched = await argon2.verify(user.password, password);
    if (!isMatched) throw new NotMatchedPasswordError();
    const generateJWT = jwt.sign({ id: user.id, email: user.email }, 'thiismysecretkey');
    const auth = new Auth(user.id, generateJWT);
    return auth;
  }
}
