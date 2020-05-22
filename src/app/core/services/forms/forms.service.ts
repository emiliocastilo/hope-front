import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FormsModel } from '../../models/forms/forms.model';
const PATH = '/templates';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor(private _http: HttpClient) {}

  public get(): any {
    return this._http.get<FormsModel>(PATH + '?key=DATOS_ GENERALES_PACIENTE');
  }
}
