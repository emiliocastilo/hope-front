import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientsTreatmentsService {
  constructor(private _http: HttpClient) {}

  getFindPatientsUnderTreatment(query: string): Observable<any> {
    return this._http.get(
      `/patients-treatments/find-patients-under-treatment?${query}`
    );
  }
  getPatientsTreatmentFindPatients(
    type: string,
    indication: string
  ): Observable<any> {
    return this._http.get(
      `/patients-treatments/find-patients-under-treatment?type=${type}&indication=${indication}`
    );
  }
  getDetailPatientsUnderTreatment(query: string = ''): Observable<any> {
    return this._http.get(
      `/patients-treatments/get-detail-patients-under-treatment?${query}`
    );
  }

  getDetailPatientsUnderTreatmentExport(query: string = ''): Observable<any> {
    return this._http.get(
      `/patients-treatments/get-detail-patients-under-treatment-export?${query}`
    );
  }
}
