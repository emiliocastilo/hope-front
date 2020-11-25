import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedicinesServices {
  constructor(private _http: HttpClient) {}

  getAll(query: string): Observable<any> {
    return this._http.get(`/medicines?${query}`);
  }

  getByText(query: string) {
    return this._http.get(`/medicines/searches?${query}`);
  }

  getDosesByMedicine(query: string) {
    return this._http.get(`/medicines/doses?${query}`).toPromise();
  }
}
