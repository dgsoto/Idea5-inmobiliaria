export class GetAllRolesResponse {
  constructor(
    public id: string,
    public roleName: string,
    public roleState: string,
  ) {}
}