import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import {
  IProductBrandGet,
  IProductBrand,
} from '../../interfaces/product-brand.interfaces';
import { TitlePageComponent } from '../../../components/title-page/title-page.component';
import { MsgAlertComponent } from '../../../components/msg-alert/msg-alert.component';
import { TableListComponent } from '../../../components/table-list/table-list.component';
import { Environment } from '@environments/environment.development';
import { DataForCrudStore } from '../../store/dataForCrud.store';
import { ProductBrandMapper } from '../../mappers/product-brand.mapper';

@Component({
  selector: 'product-brand-page',
  imports: [TitlePageComponent, MsgAlertComponent, TableListComponent],
  templateUrl: './product-brand-page.component.html',
})
export class ProductBrandPageComponent {
  private prodServi = inject(ProductsService);
  private urlForActions = inject(DataForCrudStore);
  private mapPro = ProductBrandMapper.mapProductBrand;
  public tableKeys = signal<(keyof IProductBrandGet)[]>([]);
  private urlForReq: string = `${Environment.apiBase}/ProductBrand`;
  private urlTemplateRedirect: string = `/product/product-brand-list`;

  prodBrandData = rxResource({
    loader: ({}) => {
      const data = this.prodServi
        .getDataFromApi<IProductBrand, IProductBrandGet>(
          this.urlForReq,
          this.mapPro
        )
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

/* prodBrandData = rxResource({
    loader: ({ request, previous }) => {
      const data = this.productServ.getProdBrandData(urlProdBrand).pipe(
        tap((resp) => {
          console.log(resp);
          console.log(resp.length);
          if (resp.length > 0) {
            const keys = this.productServ.getObjectKeys(resp[0]);
            this.tableKeys.set(keys);
            console.log(this.tableKeys());
            this.urlDel.clearUrlDelete();
            this.urlDel.setUrlDelete(urlProdBrand);
          }
        })
      );
      console.log(data);
      return data;
    },
  }); */
