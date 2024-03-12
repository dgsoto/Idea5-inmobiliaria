import { Role } from '../../domain/Role';
import type { IRoleRepository } from '../../domain/IRoleRepository';
import { PrismaClient } from '@prisma/client';
import 'reflect-metadata';
import { injectable } from 'tsyringe';
import { RoleId } from '../../domain/RoleId';
import { RoleName } from '../../domain/RoleName';
import { RoleState } from '../../domain/RoleState';

@injectable()
export class RoleRepository implements IRoleRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(roleData: Role): Promise<void> {
    await this.prisma.role.create({
      data: {
        id: roleData.id.value,
        role_name: roleData.roleName.toString(),
        role_state: roleData.roleState.toString(),
      },
    });
  }

  async update(roleData: Role): Promise<void> {
    await this.prisma.role.update({
      where: { id: roleData.id.value },
      data: {
        role_name: roleData.roleName.toString(),
        role_state: roleData.roleState.toString(),
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.role.delete({ where: { id } });
  }

  async getById(id: string): Promise<Role | null> {
    const roleData = await this.prisma.role.findUnique({ where: { id } });
    return roleData ? new Role(new RoleId(roleData.id), new RoleName(roleData.role_name), new RoleState(roleData.role_state)) : null;
  }

  async getAll(): Promise<Role[]> {
    const rolesData = await this.prisma.role.findMany();
    return rolesData.map((role) => new Role(new RoleId(role.id), new RoleName(role.role_name), new RoleState(role.role_state)));
  }
}
