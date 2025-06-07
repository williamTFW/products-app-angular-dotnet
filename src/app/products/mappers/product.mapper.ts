import { Product, ProductList } from '../interfaces/product.interfaces';

export class ProductMapper {
  static mapResProToProd(resProd: Product): ProductList {
    return {
      id: resProd.id,
      name: resProd.name,
      code: resProd.code,
    };
  }

  static mapResProdArrayToProArray(resProduct: Product[]): ProductList[] {
    return resProduct.map(this.mapResProToProd);
  }
}
