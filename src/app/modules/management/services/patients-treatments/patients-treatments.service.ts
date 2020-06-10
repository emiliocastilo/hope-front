import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientsTreatmentsService {
  constructor(private _http: HttpClient) {}

  getPatientsTreatmentFindPatients(type: string, indication: string = ''): Observable<any> {
    return this._http.get(`/patients-treatments/find-patients-under-treatment?type=${type}&indication=${indication}`);
  }

  getPatientsTreatmentDetailPatients(type: string = '', indication: string = ''): Observable<any> {
    return this._http.get(`/patients-treatments/get-detail-patients-under-treatment?type=${type}&indication=${indication}`);
  }

  getDetails(query: string): Observable<any> {
    query = query ? query : 'page=0';
    return this._http.get(`/patients-diagnoses/indications/patients?${query}`);
  }

}
