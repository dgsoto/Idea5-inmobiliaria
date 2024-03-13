export class GetRoleByIdResponse {
  constructor(
    public id: string,
    public roleName: string,
    public roleState: string,
  ) {}
}
