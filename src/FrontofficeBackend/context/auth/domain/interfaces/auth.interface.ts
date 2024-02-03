import { Auth, SignInProps } from '../auth';

export interface IAuthRepository {
  signIn(auth: Auth): Promise<SignInProps>;
}
