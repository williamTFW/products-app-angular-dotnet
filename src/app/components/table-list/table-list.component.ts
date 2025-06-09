import { Component, inject, input, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { ListMsgStore } from 'src/app/products/store/list-msg.store';
import { BtnDeleteComponent } from '../btn-delete/btn-delete.component';
import { DataForCrudStore } from 'src/app/products/store/dataForCrud.store';

@Component({
  selector: 'table-list',
  imports: [TitleCasePipe, BtnDeleteComponent],
  templateUrl: './table-list.component.html',
})
export class TableListComponent {
  private tableListMsg = inject(ListMsgStore);
  public dataCrudSto = inject(DataForCrudStore);
  public dataKeys = input.required<string[]>();
  public dataTable = input.required<unknown[]>();
  public infoMsg = signal(this.tableListMsg.listInfoMsg());

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
