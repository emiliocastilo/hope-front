import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PatientsDashboardService {
    constructor(private _httpClient: HttpClient) {}

    public getPatientsDashboardById(id: string): Observable<any> {
        console.log(`/patients-dashboards/${id}`);
        return this._httpClient.get(`/patients-dashboards/${id}`);
    }

    public findEvolutionClinicalIndicesByIndexTypeAndPatient(indexType: string, patientId: string): Observable<any> {
        return this._httpClient.get(`/patients-dashboards/evolution-indices-clinical?indicesTypes=${indexType}&patId=${patientId}`);
        '';
    }
}
