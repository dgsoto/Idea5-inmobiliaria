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

  toPrimitives(): Record<string, unknown> {
    return {
      id: this.id.value,
      roleName: this.roleName.getValue(),
      roleState: this.roleState.getValue(),
    };
  }

  static fromPrimitives(data: Record<string, unknown>): Role {
    return new Role(new RoleId(data.id as string), new RoleName(data.roleName as string), new RoleState(data.roleState as string));
  }
}
