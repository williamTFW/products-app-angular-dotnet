import { inject, Injectable } from '@angular/core';
import { ProductBrand } from '../interfaces/product-brand.interfaces';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { ProductBrandMapper } from '../mappers/product-brand.mapper';
import { Product } from '../interfaces/product.interfaces';
import { ProductMapper } from '../mappers/product.mapper';
import { ApiResponseProductBrand } from '../interfaces/apiResponse.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http: HttpClient = inject(HttpClient);

  public getProdBrandData(url: string) {
    return this.http.get<ProductBrand[]>(url).pipe(
      map((res) =>
        ProductBrandMapper.mapRestProdBrandArrayToProBrandArray(res)
      ),
      tap((resp) => console.log(resp)),
      catchError((err) => {
        /* console.log(`Error: ${err.name}`);
        console.log(`Error: ${err.message}`);
        console.log(`Error: ${err.error}`);
        console.log({ err }); */
        return throwError(
          () =>
            new Error(`Ocurrió un error en la petición: ${err.error.message}`)
        );
      })
    );
  }

  public getProdData(url: string) {
    return this.http.get<Product[]>(url).pipe(
      map((res) => ProductMapper.mapResProdArrayToProArray(res)),
      tap((resp) => console.log(resp)),
      catchError((err) => {
        console.log({ err });
        return throwError(
          () =>
            new Error(`Ocurrió un error en la petición: ${err.error.message}`)
        );
      })
    );
  }

  public addNewData<T>(
    url: string,
    data: any
  ): Observable<ApiResponseProductBrand<T>> {
    return this.http.post<ApiResponseProductBrand<T>>(url, data).pipe(
      tap((resp) => console.log(resp)),
      catchError((err) => {
        console.log({ err });
        return throwError(
          () =>
            new Error(`Ocurrió un error en la petición: ${err.error.message}`)
        );
      })
    );
  }

  public deleteData<T>(
    url: string,
    id: number
  ): Observable<ApiResponseProductBrand<T>> {
    return this.http.delete<ApiResponseProductBrand<T>>(`${url}/${id}`).pipe(
      tap((resp) => console.log(resp)),
      catchError((err) => {
        console.log({ err });
        return throwError(
          () =>
            new Error(`Ocurrió un error en la petición: ${err.error.message}`)
        );
      })
    );
  }

  getObjectKeys<T extends object>(obj: T): (keyof T)[] {
    return Object.keys(obj) as (keyof T)[];
  }

  getValue<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
  }

  public isDataObject<T>(
    resp: ApiResponseProductBrand<T>
  ): resp is ApiResponseProductBrand<T> & { data: T } {
    return typeof resp.data === 'object' && resp.data !== null;
  }

  public getDataIfObject<T>(resp: ApiResponseProductBrand<T>): T | null {
    return this.isDataObject(resp) ? resp.data : null;
  }

  /*   public getKeysFromData(data: ProductBrandList): string[] {
    const keys = Object.keys(data);
    return keys;
  }
 */
}
