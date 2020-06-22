import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientsDashboardService {
  constructor(private _httpClient: HttpClient) {}

  public getPatientsDashboardById(id: string): Observable<any> {
    return this._httpClient.get(`/patients-dashboards/${id}`);
  }
}
