import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GraphsService {
    public selectedRole: any;
    constructor(private _httpClient: HttpClient) { }

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

    public getChartTableCIE(): Observable<any> {
        this.selectedRole = JSON.parse(localStorage.getItem('user')).rolSelected;
        const userHospital: any = this.selectedRole.hospital.id;
        return this._httpClient.get('/patients-diagnoses/cie?hospitalId=' + userHospital);
    }

    public getPatientsDetailCIE(query: string): Observable<any> {
        return this._httpClient.get(`/patients-diagnoses/cie/patients?${query}`);
    }

    public getPatientsDetailCIEExport(query: string): Observable<any> {
        return this._httpClient.get(`/patients-diagnoses/cie/patients-export?${query}`);
    }

    public getFindResultsByType(query: string): Observable<any> {
        return this._httpClient.get(`/health-outcomes/find-results-by-types?${query}`);
    }

    public getDetailsResultByType(query: string): Observable<any> {
        return this._httpClient.get(`/health-outcomes/get-detail-results-by-type?${query}`);
    }

    public getDetailsResultByTypeExport(query: string): Observable<any> {
        return this._httpClient.get(`/health-outcomes/get-detail-results-by-type-export?${query}`);
    }

    public getTreatments() {
        return this._httpClient.get('/patients-diagnoses/treatments');
    }

    public getTreatmentDetails(query: string) {
        return this._httpClient.get(`/patients-diagnoses/treatments/patients?${query}`);
    }

    public getTreatmentDetailsExport(query: string) {
        return this._httpClient.get(`/patients-diagnoses/treatments/patients-export?${query}`);
    }

    public getCombinedTreatment() {
        return this._httpClient.get(`/patients-diagnoses/combined-treatments`);
    }

    public getCombinedTreatmentDetails(query: string) {
        return this._httpClient.get(`/patients-diagnoses/combined-treatments/patients?${query}`);
    }

    public getCombinedTreatmentDetailsExport(query: string) {
        return this._httpClient.get(`/patients-diagnoses/combined-treatments/patients-export?${query}`);
    }

    public getReasonLastChangeBiological(query: string) {
        return this._httpClient.get(`/patients-diagnoses/end-causes?${query}`);
    }

    public getReasonLastChangeBiologicalDetails(query: string) {
        return this._httpClient.get(`/patients-diagnoses/end-causes/patients?${query}`);
    }

    public getReasonLastChangeBiologicalDetailsExport(query: string) {
        return this._httpClient.get(`/patients-diagnoses/end-causes/patients-export?${query}`);
    }

    public getReasonLastChangeBiologicalFiveYears(query: string) {
        return this._httpClient.get(`/patients-diagnoses/end-causes-last-years?${query}`);
    }

    public getReasonLastChangeBiologicalDetailsFiveYears(query: string) {
        return this._httpClient.get(`/patients-diagnoses/end-causes-last-years/patients?${query}`);
    }

    public getReasonLastChangeBiologicalDetailsExportFiveYears(query: string) {
        return this._httpClient.get(`/patients-diagnoses/end-causes-last-years/patients-export?${query}`);
    }

    public getNumberChangesBiologicalTreatment() {
        return this._httpClient.get(`/patients-diagnoses/number-changes`);
    }

    public getNumberChangesBiologicalTreatmentDetails(query: string) {
        return this._httpClient.get(`/patients-diagnoses/number-changes/patients?${query}`);
    }

    public getNumberChangesBiologicalTreatmentExport(query: string) {
        return this._httpClient.get(`/patients-diagnoses/number-changes/patients-export?${query}`);
    }

    public getBiologicalTreatmentfrequency() {
        return this._httpClient.get(`/patients-treatments/find-info-patients-doses`);
    }

    public getBiologicalTreatmentfrequencyTableData() {
        return this._httpClient.get(`/patients-treatments/find-info-patients-doses-medicines`);
    }

    public getBiologicalTreatmentfrequencyDetails(query: string) {
        return this._httpClient.get(`/patients-treatments/get-detail-patients-per-doses?${query}`);
    }

    public getBiologicalTreatmentfrequencyExport(query: string) {
        return this._httpClient.get(`/patients-treatments/get-detail-patients-per-doses-export?${query}`);
    }

    public getMonthlyConsuptionEuros() {
        return this._httpClient.get(`/dispensation-details/find-monthly-consumes`);
    }

    public getMonthlyConsuptionEurosAccumulated() {
        return this._httpClient.get(`/dispensation-details/find-monthly-consumes-accumulated`);
    }

    public getMonthlyConsuptionEurosAvgAccumulated(query: string) {
        return this._httpClient.get(`/dispensation-details/find-monthly-consumes-accumulated-avg?${query}`);
    }

    public getMonthlyConsuptionEurosAvg(query: string) {
        return this._httpClient.get(`/dispensation-details/find-monthly-consumes-avg?${query}`);
    }

    public getTotalExpenses(query: string) {
        return this._httpClient.get(`/dispensation-details/find-total-cost-treatments?${query}`);
    }

    public getTotalAccumulatedExpenses(query: string) {
        return this._httpClient.get(`/dispensation-details/find-total-cost-treatments-accumulated?${query}`);
    }

    public getTotalAvgExpenses(query: string) {
        return this._httpClient.get(`/dispensation-details/find-total-cost-treatments-avg?${query}`);
    }

    public getTotalAvgAccumulatedExpenses(query: string) {
        return this._httpClient.get(`/dispensation-details/find-total-cost-treatments-accumulated-avg?${query}`);
    }

    /***** VIH *****/
    // TODO plopezc - completar con back, ahora están puestas igual
    //Parámetros clínicos
    public getPatientsByClinicalParameter(query: string) {
        return this._httpClient.get(`/patient-clinical-data/by-type?${query}`);
    }

    public getDetailPatientsByClinicalParameter(query: string) {
        return this._httpClient.get(`/patient-clinical-data/by-type-indication?${query}`);
    }

    public getDetailPatientsByClinicalParameterToExport(query: string) {
        return this._httpClient.get(`/patient-clinical-data/by-type-indication-toExport?${query}`);
    }

    //Costes tipo paciente
    public getPatientsByPatientType(): any {
        return this._httpClient.get(`/patient-clinical-data/by-patientType`);
    }
    public getDetailPatientsByPatientType(query: string) {
        return this._httpClient.get(`/patient-clinical-data/detail-by-patientType?${query}`);
    }
    public getDetailPatientsByPatientTypeToExport(query: string) {
        return this._httpClient.get(`/patient-clinical-data/detail-by-patientType-toExport?${query}`);
    }
    public getCostsByPatientType() {
        return this._httpClient.get(`/patient-clinical-data/by-costs`);
    }
    public getAvgCostsByPatientType() {
        return this._httpClient.get(`/patient-clinical-data/by-costs-avg`);
    }
    public getCostsByPatientTypeAccumulated() {
        return this._httpClient.get(`/patient-clinical-data/by-costs-accumulated`);
    }
    public getAvgCostsByPatientTypeAccumulated() {
        return this._httpClient.get(`/patient-clinical-data/by-costs-avg-accumulated`);
    }

    // Pautas
    public getCostsByGuideLine(query: string): Observable<any> {
        return this._httpClient.get(`/patient-clinical-data/by-guideline?${query}`);
    }
    public getCostsByGuideLineAccumulated(query: string) {
        return this._httpClient.get(`/patient-clinical-data/by-guideline-accumulated?${query}`);
    }
    public getAvgCostsByGuideLine(query: string) {
        return this._httpClient.get(`/patient-clinical-data/by-guideline-avg?${query}`);
    }
    public getAvgCostsByGuideLineAccumulated(query: string) {
        return this._httpClient.get(`/patient-clinical-data/by-guideline-avg-acucumulated?${query}`);
    }

    // Mock para getPatientsByPatientType()
    public getMock(): any {
        const data = [
            { name: 'En ensayo clínico', value: 9 },
            { name: 'Controlados y estables', value: 20 },
        ];

        return data;
    }
}
