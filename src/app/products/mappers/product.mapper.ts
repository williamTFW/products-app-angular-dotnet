import { IProduct, IProductGet } from '../interfaces/product.interfaces';

export type MapperFn<T, U> = (item: T) => U;

export class ProductMapper {
  static mapProduct(product: IProduct): IProductGet {
    return {
      id: product.id,
      name: product.name,
      code: product.code,
    };
  }

  static mapResProdArrayToProArray(resProduct: IProduct[]): IProductGet[] {
    return resProduct.map(this.mapProduct);
  }
}
