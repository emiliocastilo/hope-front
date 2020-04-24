import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  constructor(private _httpClient: HttpClient) {}

  public getPatients(): Observable<any> {
    return this._httpClient.get('/patient?pth=2');
  }

  public getPatientsById(id: string): Observable<any> {
    return this._httpClient.get('/patient/'.concat(id));
  }

  public deletePatient(id: string): Observable<any> {
    return this._httpClient.delete('/patient/' + id);
  }
}
