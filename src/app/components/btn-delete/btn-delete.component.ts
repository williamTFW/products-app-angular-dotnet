import { Component, inject, input } from '@angular/core';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'btn-delete',
  imports: [],
  templateUrl: './btn-delete.component.html',
})
export class BtnDeleteComponent {
  public idDelete = input.required<number>();
  private prodServ = inject(ProductsService);

  onSubmit() {
    const idVal = this.idDelete();
    console.log(idVal);
    return;
  }
}
