import { Auth } from '../domain/auth';
import { ErrorProps, SignInProps } from '../domain/interfaces/auth.interface';
import { IAuthRepository } from '../domain/interfaces/auth.interface';

export class AuthService {
  private authRepository: IAuthRepository;
  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository;
  }

  public async signIn(email: string, password: string): Promise<SignInProps | ErrorProps> {
    const auth: Auth = new Auth(email, password);
    return await this.authRepository.signIn(auth);
  }
}
