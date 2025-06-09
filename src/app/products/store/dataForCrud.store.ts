import { Injectable, signal } from '@angular/core';
import { IFormField } from '../interfaces/form.interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataForCrudStore {
  private _urlToDelete = signal<string | null>(null);
  private _urlToRedirect = signal<string | null>(null);
  public readonly urlToDel = this._urlToDelete.asReadonly();
  public readonly urlToRedirect = this._urlToRedirect.asReadonly();

  setUrlDelete(url: string | null) {
    this._urlToDelete.set(url);
  }

  setUrlRedirect(url: string | null) {
    this._urlToRedirect.set(url);
  }

  getUrlDelete() {
    return this._urlToDelete();
  }

  getUrlRedirect() {
    return this._urlToRedirect();
  }

  clearUrlDelete() {
    this._urlToDelete.set(null);
  }

  clearUrlRedirect() {
    this._urlToRedirect.set(null);
  }

  clearAllUrl() {
    this._urlToDelete.set(null);
    this._urlToRedirect.set(null);
  }
}
