import { Component, inject, input, signal } from '@angular/core';
import { ProductBrandList } from '../../products/interfaces/product-brand.interfaces';
import { Observable } from 'rxjs';
import { JsonPipe, TitleCasePipe } from '@angular/common';
import { ListMsg } from 'src/app/products/store/list-msg.store';
import { BtnDeleteComponent } from '../btn-delete/btn-delete.component';

@Component({
  selector: 'table-list',
  imports: [TitleCasePipe, JsonPipe, BtnDeleteComponent],
  templateUrl: './table-list.component.html',
})
export class TableListComponent {
  private tableListMsg = inject(ListMsg);
  public dataKeys = input.required<string[]>();
  public dataTable = input.required<unknown[]>();
  public infoMsg = this.tableListMsg.listInfoMsg();

  public getValue(obj: unknown, key: string): string {
    if (obj && typeof obj === 'object' && key in obj) {
      const value = (obj as any)[key];
      return value != null ? String(value) : '';
    }
    return '';
  }

  ngOnInit() {
    setTimeout(() => {
      this.tableListMsg.clearMessage();
    }, 2000);
  }
}
