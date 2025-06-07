import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ListMsg {
  private _message = signal<string | null>(null);
  readonly listInfoMsg = this._message.asReadonly();

  setMessage(msg: string) {
    this._message.set(msg);
  }

  getMessage() {
    return this._message();
  }

  clearMessage() {
    this._message.set(null);
  }
}
