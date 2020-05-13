import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DispensationModel } from '../../models/dispensation/dispensation.model';

@Injectable({
  providedIn: 'root',
})
export class DispensationService {
  constructor(private _http: HttpClient) {}

  getAll(query: string): Observable<any> {
    query = query ? query : '';
    return this._http.get(`/dispensations?${query}`);
  }

  save(dispensationModel: DispensationModel): Observable<any> {
    const formData: FormData = new FormData();
    Object.keys(dispensationModel).map((key: string) => {
      formData.append(key, dispensationModel[key]);
    });

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this._http.post('/dispensations', formData, { headers });
  }

  delete(id: number): Observable<any> {
    return this._http.delete(`/dispensations/${id}`);
  }
}
