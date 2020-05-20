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
    return this._httpClient.get(`graphs/health-outcomes-by-types?type=${type}`);
  }
}
