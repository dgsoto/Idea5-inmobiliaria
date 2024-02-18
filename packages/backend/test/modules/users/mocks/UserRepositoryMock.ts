import 'reflect-metadata';
import { IUserRepository } from '../../../../src/modules/User/domain/IUserRepository';
import { User } from '../../../../src/modules/User/domain/User';

export class UserRepositoryMock implements IUserRepository {
  private createMock: jest.Mock;
  private getMock: jest.Mock;
  private users: User[];

  constructor() {
    this.createMock = jest.fn();
    this.getMock = jest.fn();
    this.users = [];
  }

  async getById(id: string): Promise<User | null> {
    const user = this.users.find((u) => u.id.value === id);
    return user ?? null;
  }

  async create(user: User): Promise<void> {
    this.users.push(user);
    this.createMock(user);
    return Promise.resolve();
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = this.users.find((u) => u.id.value === email);
    return user ?? null;
  }

  assertSaveHaveBeenCalledWith(expected: User): void {
    expect(this.createMock).toHaveBeenCalledWith(expected);
  }
}
