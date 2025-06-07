import { Component, input } from '@angular/core';

@Component({
  selector: 'msg-alert',
  imports: [],
  templateUrl: './msg-alert.component.html',
})
export class MsgAlertComponent {
  public msgType = input.required<string>();
  public msgContent = input.required();
}
