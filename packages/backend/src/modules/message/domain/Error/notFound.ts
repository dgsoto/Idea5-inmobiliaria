export class NotFound extends Error {
  constructor(attribute: string) {
    super('No se encontró ' + attribute);
    this.name = 'DontFound';
  }
}
