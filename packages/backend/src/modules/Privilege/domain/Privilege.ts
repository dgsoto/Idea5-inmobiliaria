import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { PrivilegeId } from './PrivilegeId';
import { PrivilegeName } from './PrivilegeName';
import { PrivilegePath } from './PrivilegePath';
import { PrivilegeState } from './PrivilegeState';

export class Privilege extends AggregateRoot {
  id: PrivilegeId;
  privilegeName: PrivilegeName;
  privilegePath: PrivilegePath;
  privilegeState: PrivilegeState;

  constructor(id: PrivilegeId, privilegeName: PrivilegeName, privilegePath: PrivilegePath, privilegeState: PrivilegeState) {
    super();
    this.id = id;
    this.privilegeName = privilegeName;
    this.privilegePath = privilegePath;
    this.privilegeState = privilegeState;
  }

  static async create(
    id: PrivilegeId,
    privilegeName: PrivilegeName,
    privilegePath: PrivilegePath,
    privilegeStatus: PrivilegeState,
  ): Promise<Privilege> {
    return new Privilege(id, privilegeName, privilegePath, privilegeStatus);
  }

  async updateFields(privilegeName: PrivilegeName, privilegePath: PrivilegePath, privilegeState: PrivilegeState): Promise<void> {
    this.privilegeName = privilegeName;
    this.privilegeState = privilegeState;
  }

  toPrimitives(): Record<string, unknown> {
    return {
      id: this.id.value,
      privilegeName: this.privilegeName.getValue(),
      privilegeState: this.privilegeState.getValue(),
    };
  }

  static fromPrimitives(data: Record<string, unknown>): Privilege {
    return new Privilege(
      new PrivilegeId(data.id as string),
      new PrivilegeName(data.privilegeName as string),
      new PrivilegePath(data.privilegePath as string),
      new PrivilegeState(data.privilegeState as string),
    );
  }
}
