export interface IApiResponseAdd<T> {
  status: boolean;
  data: T | string;
}

export interface IApiResponseDelete {
  status: boolean;
  data: string;
}

export interface IApiResponseGet<T> {
  status: boolean;
  data: T;
}
