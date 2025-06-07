import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { TitlePageComponent } from '../../../components/title-page/title-page.component';
import { MsgAlertComponent } from '../../../components/msg-alert/msg-alert.component';
import { ProductList } from '../../interfaces/product.interfaces';
import { TableListComponent } from '../../../components/table-list/table-list.component';
import { Environment } from '@environments/environment.development';

const urlProd: string = `${Environment.apiBase}/Product`;

@Component({
  selector: 'product-page',
  imports: [TitlePageComponent, MsgAlertComponent, TableListComponent],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {
  public prodServi = inject(ProductsService);
  public tableKeys = signal<(keyof ProductList)[]>([]);

  dataProducts = rxResource({
    loader: ({}) => {
      const data = this.prodServi.getProdData(urlProd).pipe(
        tap((resp) => {
          if (resp.length > 0) {
            const keys = this.prodServi.getObjectKeys(resp[0]);
            this.tableKeys.set(keys);
          }
        })
      );
      return data;
    },
  });
}
