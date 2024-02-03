export class Auth {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export interface SignInProps {
  status: number;
  user: { email: string; name: string };
  token: string;
}
