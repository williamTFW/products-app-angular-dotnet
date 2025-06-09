import {
  IProductBrand,
  IProductBrandGet,
} from '../interfaces/product-brand.interfaces';

export class ProductBrandMapper {
  static mapProductBrand(productBrand: IProductBrand): IProductBrandGet {
    return {
      id: productBrand.id,
      name: productBrand.name,
    };
  }

  // static RestCountry[] => Country[]
  static mapRestProdBrandArrayToProBrandArray(
    restCountries: IProductBrand[]
  ): IProductBrandGet[] {
    return restCountries.map(this.mapProductBrand);
  }
}
