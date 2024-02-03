import { Auth, SignInProps } from '../domain/auth';
import { IAuthRepository } from '../domain/interfaces/auth.interface';

export class AuthService {
  private authRepository: IAuthRepository;
  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository;
  }

  public async signIn(email: string, password: string): Promise<SignInProps> {
    const auth: Auth = new Auth(email, password);
    return await this.authRepository.signIn(auth);
  }
}
