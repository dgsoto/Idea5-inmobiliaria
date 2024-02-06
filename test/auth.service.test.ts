import { AuthRepository } from '../src/FrontofficeBackend/context/auth/infraestructure/auth.repository';
import { AuthService } from '../src/FrontofficeBackend/context/auth/application/auth.service';
import { PrismaClient } from '@prisma/client';

describe('Auth Service', () => {
  let authService: AuthService;

  beforeEach(() => {
    const db = new PrismaClient();
    //create user
  });

  beforeEach(() => {
    let authRepository = new AuthRepository();
    authService = new AuthService(authRepository);
  });

  afterAll(() => {
    //delete user of beforeEqach
  });

  test('should return token', () => {
    // authService.signIn(); with new user
  });
});
