import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { RoleId } from './RoleId';
import { RoleName } from './RoleName';
import { RoleState } from './RoleState';

export class Role extends AggregateRoot {
  id: RoleId;
  roleName: RoleName;
  roleState: RoleState;

  constructor(id: RoleId, roleName: RoleName, roleState: RoleState) {
    super();
    this.id = id;
    this.roleName = roleName;
    this.roleState = roleState;
  }

  static async create(id: RoleId, roleName: RoleName, roleStatus: RoleState): Promise<Role> {
    return new Role(id, roleName, roleStatus);
  }

  async updateFields(roleName: RoleName, roleState: RoleState): Promise<void> {
    this.roleName = roleName;
    this.roleState = roleState;
  }

  toPrimitives() {
    throw new Error('Method not implemented.');
  }
}
