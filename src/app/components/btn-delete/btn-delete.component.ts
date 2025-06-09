import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IApiResponseDelete } from 'src/app/products/interfaces/apiResponse.interfaces';
/* import { IUrlForm } from 'src/app/products/interfaces/form.interfaces'; */
import { ProductsService } from 'src/app/products/services/products.service';
import { DataForCrudStore } from 'src/app/products/store/dataForCrud.store';
import { ListMsgStore } from 'src/app/products/store/list-msg.store';

@Component({
  selector: 'btn-delete',
  imports: [],
  templateUrl: './btn-delete.component.html',
})
export class BtnDeleteComponent implements OnInit {
  private datCrudSto = inject(DataForCrudStore);
  private prodServ = inject(ProductsService);
  private tableListMsg = inject(ListMsgStore);
  private router = inject(Router);
  public idDelete = input.required<number>();
  public dataList = computed(() => {});

  onSubmit() {
    const iDDel = this.idDelete();
    const urlDel = `${this.datCrudSto.urlToDel()}/${iDDel}`;

    console.log(this.datCrudSto.urlToRedirect());
    this.router.navigate([this.router.url]);
    /* return; */
    console.log(urlDel);

    this.prodServ.deleteData(urlDel).subscribe({
      next: (resp) => {
        console.log(resp);
        console.log({ resp });
        console.log(resp.data);
        this.tableListMsg.setMessage(resp.data);
        console.log(this.tableListMsg.listInfoMsg());
        this.router.navigate([this.datCrudSto.urlToRedirect()]);
      },
    });
    return;
  }

  ngOnInit(): void {
    console.log('Corriendo');
  }
}

/*private urlReq: IUrlForm = {
    actionReq: `${Environment.apiBase}/ProductBrand`,
    list: `/product/product-brand-list`,
  };
  public getUrlReq(): IUrlForm {
    return this.urlReq;
  } */
