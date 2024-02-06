import { Auth } from '../auth';

export interface IAuthRepository {
  signIn(auth: Auth): Promise<SignInProps | ErrorProps>;
}
export interface SignInProps {
  status: number;
  user: { email: string; name: string };
  token: string;
}

export interface ErrorProps {
  status: number;
  message: string;
}
