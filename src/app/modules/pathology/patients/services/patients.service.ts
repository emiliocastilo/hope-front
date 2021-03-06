import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientModel } from '../models/patient.model';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  constructor(private _httpClient: HttpClient) {}

  public getPatients(query: string): Observable<any> {
    query = query ? query : '';
    return this._httpClient.get(`/patients?pth=1${query}`);
  }

  public getPatientsById(id: string): Observable<any> {
    return this._httpClient.get(`/patients/searches?pth=1&search=${id}`);
  }

  public createPatient(request: PatientModel): Observable<any> {
    return this._httpClient.post('/patients', request);
  }

  public updatePatient(request: PatientModel): Observable<any> {
    return this._httpClient.put('/patients', request);
  }

  public deletePatient(id: string): Observable<any> {
    return this._httpClient.delete(`/patients/${id}`);
  }
}
