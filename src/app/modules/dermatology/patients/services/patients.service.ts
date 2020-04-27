import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientModel } from '../models/patient.model';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  constructor(private _httpClient: HttpClient) {}

  public getPatients(): Observable<any> {
    return this._httpClient.get('/patient?pth=1');
  }

  public getPatientsById(id: string): Observable<any> {
    return this._httpClient.get('/patient/'.concat(id));
  }

  public createPatient(request: PatientModel): Observable<any> {
    return this._httpClient.post('/patient', request);
  }

  public updatePatient(request: PatientModel): Observable<any> {
    return this._httpClient.put('/patient', request);
  }

  public deletePatient(id: string): Observable<any> {
    return this._httpClient.delete('/patient/' + id);
  }
}
