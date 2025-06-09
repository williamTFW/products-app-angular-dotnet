import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { MapperFn } from '../mappers/product.mapper';
import {
  IApiResponseAdd,
  IApiResponseDelete,
  IApiResponseGet,
} from '../interfaces/apiResponse.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http: HttpClient = inject(HttpClient);

  public getDataFromApi<T, U>(
    url: string,
    mapperFn: MapperFn<T, U>
  ): Observable<U[]> {
    return this.http.get<IApiResponseGet<T[]>>(url).pipe(
      map((resp) => resp.data.map(mapperFn)),
      catchError((err) => {
        console.log({ err });
        return throwError(
          () => new Error(`Erros al obtener los datos ${err.message}`)
        );
      })
    );
  }

  public addNewData<T>(url: string, data: any): Observable<IApiResponseAdd<T>> {
    return this.http.post<IApiResponseAdd<T>>(url, data).pipe(
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

  public deleteData(url: string) {
    console.log({ url });
    return this.http.delete<IApiResponseDelete>(url).pipe(
      tap((resp) => {
        console.log({ resp });
      }),
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
    resp: IApiResponseAdd<T>
  ): resp is IApiResponseAdd<T> & { data: T } {
    return typeof resp.data === 'object' && resp.data !== null;
  }

  public getDataIfObject<T>(resp: IApiResponseAdd<T>): T | null {
    return this.isDataObject(resp) ? resp.data : null;
  }

  /*   public getKeysFromData(data: ProductBrandList): string[] {
    const keys = Object.keys(data);
    return keys;
  }
 */
}

/* public getProdBrandData(url: string) {
    return this.http.get<IProductBrand[]>(url).pipe(
      map((res) =>
        ProductBrandMapper.mapRestProdBrandArrayToProBrandArray(res)
      ),
      tap((resp) => console.log(resp)),
      catchError((err) => {
        console.log(`Error: ${err.name}`);
        console.log(`Error: ${err.message}`);
        console.log(`Error: ${err.error}`);
        console.log({ err });
        return throwError(
          () =>
            new Error(`Ocurrió un error en la petición: ${err.error.message}`)
        );
      })
    );
  } */

/* public getProdData(url: string) {
      return this.http.get<ApiResponseProduct>(url).pipe(
        map((res) =>
          ProductMapper.mapResProdArrayToProArray(res.data as Product[])
        ),
        tap((resp) => console.log({ resp })),
        catchError((err) => {
          console.log({ err });
          return throwError(
            () =>
              new Error(`Ocurrió un error en la petición: ${err.error.message}`)
          );
        })
      );
    } */
