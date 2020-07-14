import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor(private _http: HttpClient) {}

  public async get(key: string) {
    return this._http.get(`/templates?key=${key}`).toPromise();
  }

  public fillForm(form: any) {
    return this._http.post('/forms', form);
  }

  public updateForm(form: any) {
    return this._http.put('/forms', form);
  }

  public async retrieveForm(template: string, patientId: any) {
    return this._http
      .get(`/forms?template=${template}&patientId=${patientId}`)
      .toPromise();
  }

  public async retrieveFormGraph(template: string, patientId: any) {
    return this._http
      .get(`/forms/graphs?template=${template}&patientId=${patientId}`)
      .toPromise();
  }

  public async callEndpoint(endpoint: string) {
    return this._http.get(endpoint).toPromise();
  }

  public getFormsDatas(query: string) {
    return this._http.get(`/forms/datas?${query}`, { responseType: 'text' });
  }
}
