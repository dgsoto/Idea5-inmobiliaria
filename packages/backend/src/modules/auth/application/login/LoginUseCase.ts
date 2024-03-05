import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { inject, injectable } from 'tsyringe';
import { IAuthRepository } from '../../domain/IAuthRepository';
import { NotMatchedPasswordError } from '../../domain/errors/NotMatchedPassError';
import { NotExistEmailError } from '../../domain/errors/NotExistEmailError';
import { ILoginRequest } from './ILoginRequest';
import { LoginDTO } from './LoginDto';

@injectable()
export class LoginUseCase {
  private readonly _repository: IAuthRepository;
  constructor(@inject('AuthRepository') authRepository: IAuthRepository) {
    this._repository = authRepository;
  }

  public async run(req: ILoginRequest): Promise<LoginDTO> {
    const user = await this._repository.getByEmail(req.email);
    if (!user) throw new NotExistEmailError();

    const isMatched = await argon2.verify(user.password, req.password);
    if (!isMatched) throw new NotMatchedPasswordError();
    const generateJWT = jwt.sign({ id: user.id, email: user.email }, 'thiismysecretkey');
    const auth = new LoginDTO(user.id, generateJWT);
    return auth;
  }
}
