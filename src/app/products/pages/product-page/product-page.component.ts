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
  private urlForActions = inject(DataForCrudStore);
  private mapProduct = ProductMapper.mapProduct;
  private urlForReq: string = `${Environment.apiBase}/Product`;
  private urlTemplateRedirect: string = `/product/product-list`;

  productsData = rxResource({
    loader: ({}) => {
      const data = this.prodServi
        .getDataFromApi<IProduct, IProductGet>(this.urlForReq, this.mapProduct)
        .pipe(
          tap((resp) => {
            console.log({ resp });
            if (resp.length > 0) {
              const keys = this.prodServi.getObjectKeys(resp[0]);
              this.tableKeys.set(keys);
              this.urlForActions.clearAllUrl();
              this.urlForActions.setUrlReq(this.urlForReq);
              this.urlForActions.setUrlRedirect(this.urlTemplateRedirect);
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
