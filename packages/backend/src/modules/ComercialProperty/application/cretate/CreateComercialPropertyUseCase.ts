import type { ComercialProperty } from '../../domain/ComercialProperty';
import type { IComercialPropertyRepository } from '../../domain/IComercialPropertyRepository';

export class CreateComercialPropertyUseCase {
  private readonly _comercialPropertyRepository: IComercialPropertyRepository;

  constructor(comercialPropertyRepository: IComercialPropertyRepository) {
    this._comercialPropertyRepository = comercialPropertyRepository;
  }

  async run(body: ComercialProperty): Promise<void> {
    await this._comercialPropertyRepository.save(body);
  }
}
