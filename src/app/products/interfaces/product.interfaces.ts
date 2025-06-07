export interface Product {
  id: number;
  name: string;
  code: number;
  idProdbrand: number;
  idProdbrandNavigation: null;
}

export interface ProductList {
  id: number;
  name: string;
  code: number;
}

export interface ProductAdd {
  name: string;
  code: number;
  idProdbrand: number;
}
