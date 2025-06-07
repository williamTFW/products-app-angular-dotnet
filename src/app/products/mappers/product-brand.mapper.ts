import {
  ProductBrand,
  ProductBrandList,
} from '../interfaces/product-brand.interfaces';

export class ProductBrandMapper {
  static mapRestPBrandToPBrand(resProdBrand: ProductBrand): ProductBrandList {
    return {
      id: resProdBrand.id,
      name: resProdBrand.name,
    };
  }

  // static RestCountry[] => Country[]
  static mapRestProdBrandArrayToProBrandArray(
    restCountries: ProductBrand[]
  ): ProductBrandList[] {
    return restCountries.map(this.mapRestPBrandToPBrand);
  }

  static mapRestProductToProduct(resProdBrand: ProductBrand): ProductBrandList {
    return {
      id: resProdBrand.id,
      name: resProdBrand.name,
    };
  }

  // static RestCountry[] => Country[]
  static mapRestProdArrayToProArray(
    restCountries: ProductBrand[]
  ): ProductBrandList[] {
    return restCountries.map(this.mapRestProductToProduct);
  }
}
