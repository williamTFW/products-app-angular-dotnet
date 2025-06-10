import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataForCrudStore {
  private _urlToReq = signal<string | null>(null);
  private _urlToRedirect = signal<string | null>(null);
  private _idReq = signal<number | null>(null);
  public readonly urlToReq = this._urlToReq.asReadonly();
  public readonly urlToRedirect = this._urlToRedirect.asReadonly();
  public readonly idReq = this._idReq.asReadonly();

  /*   setUrlDelete(url: string | null) {
    this._urlToDelete.set(url);
  } */

  setUrlReq(url: string | null) {
    this._urlToReq.set(url);
  }
  setUrlRedirect(url: string | null) {
    this._urlToRedirect.set(url);
  }
  setId(url: number | null) {
    this._idReq.set(url);
  }
  getUrlReq() {
    return this._urlToReq();
  }
  getUrlRedirect() {
    return this._urlToRedirect();
  }
  getIdReq() {
    return this._idReq();
  }
  clearUrlReq() {
    this._urlToReq.set(null);
  }
  clearUrlRedirect() {
    this._urlToRedirect.set(null);
  }
  clearIdReq() {
    this._idReq.set(null);
  }
  clearAllUrl() {
    this._urlToReq.set(null);
    this._urlToRedirect.set(null);
    this._idReq.set(null);
  }
}
