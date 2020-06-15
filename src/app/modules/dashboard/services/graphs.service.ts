import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GraphsService {
  constructor(private _httpClient: HttpClient) {}

  //TODO: delete if it isn't using it
  // public getPatientsUnderTreatment(type: string): Observable<any> {
  //   return this._httpClient.get(
  //     `/graphs/patients-under-treatment?type=${type}`
  //   );
  // }
  //TODO: delete if it isn't using it
  // public getHealthOutcomesByType(type: string): Observable<any> {
  //   return this._httpClient.get(
  //     `/graphs/health-outcomes-by-types?type=${type}`
  //   );
  // }

  public getChartTableCIE9(): Observable<any> {
    return this._httpClient.get('/patients-diagnoses/cie9');
  }

  public getPatientsDetailCIE9(cie9: string): Observable<any> {
    return this._httpClient.get(
      `/patients-diagnoses/cie9/patients?cie9=${cie9}`
    );
  }

  public getFindResultsByType(query: string): Observable<any> {
    return this._httpClient.get(
      `/health-outcomes/find-results-by-types?${query}`
    );

    // return new Observable((observer) => {
    //   const response = {"QUIMICO":1,"BIOLOGICO":3,"Sin Tratamiento":3};
    //   observer.next(response);
    // });
  }

  public getDetailsResultByType(query: string): Observable<any> {
    return this._httpClient.get(
      `/health-outcomes/get-detail-results-by-type?${query}`
    );

    // return new Observable((observer) => {
    //   const response = {"content":[{"id":17,"nhc":"PCM004","healthCard":"PCMTARJ4","fullName":"Prueba4 Primer4 Segun4","principalIndication":"ERITRODERMIA","principalDiagnose":null,"principalDiagnoseCie10":null,"treatment":null,"pasi":"","pasiDate":null,"dlqi":"Prueba DLQI 6","dlqiDate":"2020-04-01T19:53:53.14883"},{"id":17,"nhc":"PCM004","healthCard":"PCMTARJ4","fullName":"Prueba4 Primer4 Segun4","principalIndication":"ERITRODERMIA","principalDiagnose":null,"principalDiagnoseCie10":null,"treatment":null,"pasi":"Prueba PASI 6","pasiDate":"2020-04-01T19:53:53.14883","dlqi":"","dlqiDate":null}],"pageable":{"sort":{"sorted":false,"unsorted":true,"empty":true},"pageNumber":0,"pageSize":5,"offset":0,"paged":true,"unpaged":false},"totalPages":1,"totalElements":2,"last":true,"first":true,"sort":{"sorted":false,"unsorted":true,"empty":true},"numberOfElements":2,"size":5,"number":0,"empty":false};
    //   observer.next(response);
    // });
  }

  public getDetailsResultByTypeExport(query: string): Observable<any> {
    return this._httpClient.get(
      `/health-outcomes/get-detail-results-by-type-export?${query}`
    );

    // return new Observable((observer) => {
    //   const response = [{"id":17,"nhc":"PCM004","healthCard":"PCMTARJ4","fullName":"Prueba4 Primer4 Segun4","principalIndication":"ERITRODERMIA","principalDiagnose":null,"principalDiagnoseCie10":null,"treatment":null,"pasi":"","pasiDate":null,"dlqi":"Prueba DLQI 6","dlqiDate":"2020-04-01T19:53:53.14883"},{"id":17,"nhc":"PCM004","healthCard":"PCMTARJ4","fullName":"Prueba4 Primer4 Segun4","principalIndication":"ERITRODERMIA","principalDiagnose":null,"principalDiagnoseCie10":null,"treatment":null,"pasi":"Prueba PASI 6","pasiDate":"2020-04-01T19:53:53.14883","dlqi":"","dlqiDate":null}];
    //   observer.next(response);
    // });
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

  public getReasonLastChangeBiologicalFiveYears(query: string) {
    return this._httpClient.get(
      `/patients-diagnoses/end-causes-last-years?${query}`
    );
  }

  public getReasonLastChangeBiologicalDetailsFiveYears(query: string) {
    return this._httpClient.get(
      `/patients-diagnoses/end-causes-last-years/patients?${query}`
    );
  }

  public getReasonLastChangeBiologicalDetailsExportFiveYears(query: string) {
    return this._httpClient.get(
      `/patients-diagnoses/end-causes-last-years/patients-export?${query}`
    );
  }

  public getNumberChangesBiologicalTreatment() {
    return this._httpClient.get(`/patients-diagnoses/number-changes`);
  }

  public getNumberChangesBiologicalTreatmentDetails(query: string) {
    return this._httpClient.get(
      `/patients-diagnoses/number-changes/patients?${query}`
    );
  }

  public getNumberChangesBiologicalTreatmentExport(query: string) {
    return this._httpClient.get(
      `/patients-diagnoses/number-changes/patients-export?${query}`
    );
  }
}
