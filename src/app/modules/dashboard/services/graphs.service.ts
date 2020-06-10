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

  public getChartTableCIE9() {
    return this._httpClient.get('/patients-diagnoses/cie9');
  }

  public getPatientsDetailCIE9(cie9: string) {
    return this._httpClient.get(
      `/patients-diagnoses/cie9/patients?cie9=${cie9}`
    );
  }

  public getHealthOutcomesFindByType(type: string): Observable<any> {
    return this._httpClient.get(
      `/health-outcomes/find-results-by-types?type=${type}`
    );
  }

  public getHealthOutcomesDetailResultByType(type: string): Observable<any> {
    return this._httpClient.get(
      `/health-outcomes/get-detail-results-by-type?indexType =${type}`
    );
  }

  public getTreatments() {
    return this._httpClient.get('/patients-diagnoses/treatments');
  }

  public getTreatmentDetails(query) {
    return this._httpClient.get(
      `/patients-diagnoses/treatments/patients?${query}`
    );
  }

  public getTreatmentDetailsExport(query) {
    return this._httpClient.get(
      `/patients-diagnoses/treatments/patients-export?${query}`
    );
  }
}
