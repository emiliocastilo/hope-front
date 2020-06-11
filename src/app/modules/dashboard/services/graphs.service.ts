import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GraphsService {
  constructor(private _httpClient: HttpClient) {}

  public getPatientsUnderTreatment(type: string): Observable<any> {
    return this._httpClient.get(
      `/graphs/patients-under-treatment?type=${type}`
    );
  }

  public getHealthOutcomesByType(type: string): Observable<any> {
    return this._httpClient.get(
      `/graphs/health-outcomes-by-types?type=${type}`
    );
  }

  public getChartTableCIE9(): Observable<any> {
    return this._httpClient.get('/patients-diagnoses/cie9');
  }

  public getPatientsDetailCIE9(cie9: string): Observable<any> {
    return this._httpClient.get(
      `/patients-diagnoses/cie9/patients?cie9=${cie9}`
    );
  }

  public getTreatments() {
    return this._httpClient.get('/patients-diagnoses/treatments');
  }

  public getTreatmentDetails(query: string) {
    return this._httpClient.get(
      `/patients-diagnoses/treatments/patients?${query}`
    );
  }

  public getTreatmentDetailsExport(query: string) {
    return this._httpClient.get(
      `/patients-diagnoses/treatments/patients-export?${query}`
    );
  }

  public getCombinedTreatment() {
    return this._httpClient.get(`/patients-diagnoses/combined-treatments`);
  }

  public getCombinedTreatmentDetails(query: string) {
    return this._httpClient.get(
      `/patients-diagnoses/combined-treatments/patients?${query}`
    );
  }

  public getCombinedTreatmentDetailsExport(query: string) {
    return this._httpClient.get(
      `/patients-diagnoses/combined-treatments/patients-export?${query}`
    );
  }

  public getReasonLastChangeBiological(query: string) {
    return this._httpClient.get(`/patients-diagnoses/end-causes?${query}`);
  }

  public getReasonLastChangeBiologicalDetails(query: string) {
    return this._httpClient.get(
      `/patients-diagnoses/end-causes/patients?${query}`
    );
  }

  public getReasonLastChangeBiologicalDetailsExport(query: string) {
    return this._httpClient.get(
      `/patients-diagnoses/end-causes/patients-export?${query}`
    );
  }
}
