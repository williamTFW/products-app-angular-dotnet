import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { ProductBrandList } from '../../interfaces/product-brand.interfaces';
import { TitlePageComponent } from '../../../components/title-page/title-page.component';
import { MsgAlertComponent } from '../../../components/msg-alert/msg-alert.component';
import { TableListComponent } from '../../../components/table-list/table-list.component';
import { Environment } from '@environments/environment.development';

const urlProdBrand: string = `${Environment.apiBase}/ProductBrand`;

@Component({
  selector: 'product-brand-page',
  imports: [TitlePageComponent, MsgAlertComponent, TableListComponent],
  templateUrl: './product-brand-page.component.html',
})
export class ProductBrandPageComponent {
  public productServ = inject(ProductsService);
  public tableKeys = signal<(keyof ProductBrandList)[]>([]);

  prodBrandData = rxResource({
    loader: ({ request, previous }) => {
      console.log(request);
      console.log(previous);
      const data = this.productServ.getProdBrandData(urlProdBrand).pipe(
        tap((resp) => {
          console.log(resp);
          console.log(resp.length);
          if (resp.length > 0) {
            const keys = this.productServ.getObjectKeys(resp[0]);
            this.tableKeys.set(keys);
            console.log(this.tableKeys());
          }
        })
      );
      console.log(data);
      return data;
    },
  });
}
