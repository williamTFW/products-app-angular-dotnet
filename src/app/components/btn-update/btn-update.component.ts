import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/products/services/products.service';
import { DataForCrudStore } from 'src/app/products/store/dataForCrud.store';

@Component({
  selector: 'btn-update',
  imports: [],
  templateUrl: './btn-update.component.html',
})
export class BtnUpdateComponent {
  private dataReqStore = inject(DataForCrudStore);
  private _router = inject(Router);
  public idUpdate = input.required<number>();

  onSubmit() {
    const idUpd = this.idUpdate();
    console.log(idUpd);
    const urlReq = `product/update-product-brand/${idUpd}`;
    console.log(urlReq);
    this._router.navigate([urlReq]);
    return;
  }
}
