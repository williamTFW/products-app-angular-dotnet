import { Component, inject, input, signal } from '@angular/core';
import { JsonPipe, TitleCasePipe } from '@angular/common';
import { ListMsgStore } from 'src/app/products/store/list-msg.store';
import { BtnDeleteComponent } from '../btn-delete/btn-delete.component';
import { DataForCrudStore } from 'src/app/products/store/dataForCrud.store';
import { BtnUpdateComponent } from '../btn-update/btn-update.component';

@Component({
  selector: 'table-list',
  imports: [TitleCasePipe, BtnDeleteComponent, BtnUpdateComponent],
  templateUrl: './table-list.component.html',
})
export class TableListComponent {
  private tableListMsg = inject(ListMsgStore);
  public dataCrudSto = inject(DataForCrudStore);
  public dataKeys = input.required<string[]>();
  public dataTable = input.required<Object[]>();
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
      this.infoMsg.set(null);
    }, 2000);
  }
}
