import type { ComercialProperty } from './ComercialProperty';

export interface IComercialPropertyRepository {
  save: (comercialProperty: ComercialProperty) => Promise<void>;
}
