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

  public getPatientsDetailCIE9(query: string): Observable<any> {
    return this._httpClient.get(`/patients-diagnoses/cie9/patients?${query}`);
  }

  public getPatientsDetailCIE9Export(query: string): Observable<any> {
    return this._httpClient.get(
      `/patients-diagnoses/cie9/patients-export?${query}`
    );
  }

  public getFindResultsByType(query: string): Observable<any> {
    return this._httpClient.get(
      `/health-outcomes/find-results-by-types?${query}`
    );
  }

  public getDetailsResultByType(query: string): Observable<any> {
    return this._httpClient.get(
      `/health-outcomes/get-detail-results-by-type?${query}`
    );
  }

  public getDetailsResultByTypeExport(query: string): Observable<any> {
    return this._httpClient.get(
      `/health-outcomes/get-detail-results-by-type-export?${query}`
    );
  }

  public getChartTableCIE10(): Observable<any> {
    return this._httpClient.get('/patients-diagnoses/cie10');
  }

  public getPatientsDetailCIE10(query: string): Observable<any> {
    return this._httpClient.get(`/patients-diagnoses/cie10/patients?${query}`);
  }

  public getPatientsDetailCIE10Export(query: string) {
    return this._httpClient.get(
      `/patients-diagnoses/cie10/patients-export?${query}`
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

  public getBiologicalTreatmentfrequency() {
    return this._httpClient.get(
      `/patients-treatments/find-info-patients-doses`
    );
  }

  public getBiologicalTreatmentfrequencyDetails(query: string) {
    return this._httpClient.get(
      `/patients-treatments/get-detail-patients-per-doses?${query}`
    );
  }

  public getBiologicalTreatmentfrequencyExport(query: string) {
    return this._httpClient.get(
      `/patients-treatments/get-detail-patients-per-doses-export?${query}`
    );
  }

  public getMonthlyConsuptionEuros() {
    return this._httpClient.get(`/dispensation-details/find-monthly-consumes`);
  }

  public getMonthlyConsuptionEurosAccumulated() {
    return this._httpClient.get(
      `/dispensation-details/find-monthly-consumes-accumulated`
    );
  }

  public getMonthlyConsuptionEurosAvgAccumulated(query: string) {
    return this._httpClient.get(
      `/dispensation-details/find-monthly-consumes-accumulated-avg?${query}`
    );
  }

  public getMonthlyConsuptionEurosAvg(query: string) {
    return this._httpClient.get(
      `/dispensation-details/find-monthly-consumes-avg?${query}`
    );
  }

  public getTotalExpenses(query: string) {
    return this._httpClient.get(
      `/dispensation-details/find-total-cost-treatments?${query}`
    );
  }

  public getTotalAccumulatedExpenses(query: string) {
    return this._httpClient.get(
      `/dispensation-details/find-total-cost-treatments-accumulated?${query}`
    );
  }

  public getTotalAvgExpenses(query: string) {
    return this._httpClient.get(
      `/dispensation-details/find-total-cost-treatments-avg?${query}`
    );
  }

  public getTotalAvgAccumulatedExpenses(query: string) {
    return this._httpClient.get(
      `/dispensation-details/find-total-cost-treatments-accumulated-avg?${query}`
    );
  }
}
