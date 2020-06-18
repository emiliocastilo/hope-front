import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientModel } from '../../models/patients/patient.model';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  constructor(private _httpClient: HttpClient) {}

  public getPatients(pathologies: string[], query: string): Observable<any> {
    query = query ? query : '';
    return this._httpClient.get(`/patients?pth=${pathologies}${query}`);
  }

  public getPatientsByIdAndPathologies(
    id: string,
    pathologies: number[]
  ): Observable<any> {
    return this._httpClient.get(
      `/patients/searches?pth=${pathologies}&search=${id}`
    );
  }

  public findPatients(pathologies: string[], filterName: string): Observable<any> {
    return this._httpClient.get(`/patients/searches?pth=${pathologies}&search=${filterName}`);
  }

  public getPatientsById(id: string): Observable<any> {
    return this._httpClient.get(`/patients/${id}`);
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
