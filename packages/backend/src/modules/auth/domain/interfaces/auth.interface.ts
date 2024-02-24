export interface IAuthRepository {
  getByEmail(email: string): Promise<any>;
}
