import { Component, inject, input } from '@angular/core';
import { ProductsService } from 'src/app/products/services/products.service';
import { DataForCrudStore } from 'src/app/products/store/dataForCrud.store';
import { ListMsgStore } from 'src/app/products/store/list-msg.store';

@Component({
  selector: 'btn-delete',
  imports: [],
  templateUrl: './btn-delete.component.html',
})
export class BtnDeleteComponent {
  private datCrudSto = inject(DataForCrudStore);
  private prodServ = inject(ProductsService);
  private tableListMsg = inject(ListMsgStore);
  public idDelete = input.required<number>();

  onSubmit() {
    const iDDel = this.idDelete();
    const urlDel = `${this.datCrudSto.urlToReq()}/${iDDel}`;
    this.prodServ.deleteData(urlDel).subscribe({
      next: (resp) => {
        console.log(resp);
        console.log({ resp });
        console.log(resp.data);
        this.tableListMsg.setMessage(resp.data);
        console.log(this.tableListMsg.listInfoMsg());
        window.location.reload();
        /* this.router
          .navigateByUrl(this.datCrudSto.urlToRedirect()!, {
            skipLocationChange: true,
            onSameUrlNavigation: 'reload',
          })
          .then(() => {
            this.router.navigate([this.datCrudSto.urlToRedirect()]);
          }); */
      },
    });
    return;
  }
}

/*private urlReq: IUrlForm = {
    actionReq: `${Environment.apiBase}/ProductBrand`,
    list: `/product/product-brand-list`,
  };
  public getUrlReq(): IUrlForm {
    return this.urlReq;
  } */
