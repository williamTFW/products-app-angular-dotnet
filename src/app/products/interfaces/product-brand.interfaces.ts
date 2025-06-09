export interface IProductBrand {
  id: number;
  name: string;
  products: any[];
}

export interface IProductBrandGet {
  id: number;
  name: string;
}

export interface IProductBrandAdd {
  name: string;
}
