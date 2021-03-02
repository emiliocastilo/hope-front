import { VihTreatmentModel, VihEditTreatmentModel, SuspendTreatmentModel } from './../models/vih-treatment.model';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/core/models/pagination/pagination/pagination.model';

@Injectable({
    providedIn: 'root',
})
export class VihTreatmentsService {
    constructor(private _http: HttpClient) {}
    private readonly endPoint = '/patients-treatments';

    public getGuidelines() {
        return this._http.get('/assets/data/vih/guidelines.json');
    }

    public getAll(): Observable<Pagination<VihTreatmentModel>> {
        return this._http.get<Pagination<VihTreatmentModel>>(`${this.endPoint}/find-all-treatments`);
    }

    public getAllByPatient(patientId: string, queryPaginator: string): Observable<Pagination<VihTreatmentModel>> {
        return this._http.get<Pagination<VihTreatmentModel>>(`${this.endPoint}/find-by-patient?patientId=${patientId}${queryPaginator}`);
    }

    public isMedicineRepeated(patientId: string, medicineId: string): Observable<boolean> {
        const params: HttpParams = new HttpParams().set('patientId', patientId).set('medicineId', medicineId);
        return this._http.get<boolean>(`/medicines/is-assigned`, { params });
    }

    public createTreatment(treatment: VihTreatmentModel): Observable<void> {
        return this._http.post<void>(`${this.endPoint}/new`, treatment);
    }

    public updateTreatment(treatment: VihEditTreatmentModel): Observable<void> {
        return this._http.post<void>(`${this.endPoint}/update`, treatment);
    }

    public suspendTreatment(treatment: SuspendTreatmentModel): Observable<void> {
        return this._http.post<void>(`${this.endPoint}/suspend`, treatment);
    }

    public deleteTreatment(lineTreatmentId: string): Observable<void> {
        return this._http.delete<void>(`${this.endPoint}/delete?lineId=${lineTreatmentId}`);
    }
}
