export abstract class BaseEntity {
  id: string;
  createdAt?: Date;
  modifiedAt?: Date;

  constructor(id: string) {
    this.id = id;
    this.createdAt = new Date();
  }
}
