import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { TitlePageComponent } from '../../../components/title-page/title-page.component';
import { MsgAlertComponent } from '../../../components/msg-alert/msg-alert.component';
import { IProductGet, IProduct } from '../../interfaces/product.interfaces';
import { TableListComponent } from '../../../components/table-list/table-list.component';
import { Environment } from '@environments/environment.development';
import { DataForCrudStore } from '../../store/dataForCrud.store';
import { ProductMapper } from '../../mappers/product.mapper';

@Component({
  selector: 'product-page',
  imports: [TitlePageComponent, MsgAlertComponent, TableListComponent],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {
  public prodServi = inject(ProductsService);
  public tableKeys = signal<(keyof IProductGet)[]>([]);
  private urlDel = inject(DataForCrudStore);
  private mapProduct = ProductMapper.mapProduct;
  private urlProdDel: string = `${Environment.apiBase}/Product`;
  private urlProdLis: string = `/product/product-list`;

  productsData = rxResource({
    loader: ({}) => {
      const data = this.prodServi
        .getDataFromApi<IProduct, IProductGet>(this.urlProdDel, this.mapProduct)
        .pipe(
          tap((resp) => {
            console.log({ resp });
            if (resp.length > 0) {
              const keys = this.prodServi.getObjectKeys(resp[0]);
              this.tableKeys.set(keys);
              this.urlDel.clearAllUrl();
              this.urlDel.setUrlDelete(this.urlProdDel);
              this.urlDel.setUrlRedirect(this.urlProdLis);
            }
          })
        );
      return data;
    },
  });
}

/* dataProducts = rxResource({
  loader: ({}) => {
    const data = this.prodServi.getProdData(urlProd).pipe(
      tap((resp) => {
        console.log({ resp });
        if (resp.length > 0) {
          const keys = this.prodServi.getObjectKeys(resp[0]);
          this.tableKeys.set(keys);
          this.urlDel.clearUrlDelete();
          this.urlDel.setUrlDelete(urlProd);
        }
      })
    );
    return data;
  },
}); */
