import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HealthOutcomeModel } from '../models/health-outcome.model';

@Injectable({
  providedIn: 'root',
})
export class PasiService {
  constructor(private _httpClient: HttpClient) {}

  public saveScore(healthOutcome: HealthOutcomeModel): Observable<any> {
    return this._httpClient.post(
      '/health-outcomes/save-score-data-by-index-type',
      healthOutcome
    );
  }
}
