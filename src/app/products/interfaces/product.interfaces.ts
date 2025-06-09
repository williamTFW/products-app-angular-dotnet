export interface IProduct {
  id: number;
  name: string;
  code: number;
  idProdbrand: number;
  idProdbrandNavigation: null;
}

export interface IProductGet {
  id: number;
  name: string;
  code: number;
}

export interface IProductAdd {
  name: string;
  code: number;
  idProdbrand: number;
}
