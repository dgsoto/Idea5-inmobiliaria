export class ComercialProperty {
  id: string;
  alias: string;
  address: string;
  features: string;
  price: number;

  constructor(id: string, alias: string, address: string, features: string, price: number) {
    this.id = id;
    this.alias = alias;
    this.address = address;
    this.features = features;
    this.price = price;
  }
}
