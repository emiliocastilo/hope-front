import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/core/models/pagination/pagination/pagination.model';
import { DermaTreatmentModel } from '../models/derma-treatment.model';

@Injectable({
    providedIn: 'root',
})
export class DermaTreatmentsService {
    constructor(private _http: HttpClient) {}

    private readonly endPoint = '/patients-treatments';

    public getAll(): Observable<Pagination<DermaTreatmentModel>> {
        return this._http.get<Pagination<DermaTreatmentModel>>(`${this.endPoint}/find-all-treatments`);
    }

    public getAllByPatient(patientId: string, queryPaginator: string): Observable<Pagination<DermaTreatmentModel>> {
        return this._http.get<Pagination<DermaTreatmentModel>>(`${this.endPoint}/find-by-patient?patientId=${patientId}${queryPaginator}`);
    }

    public isMedicineRepeated(patientId: string, medicineId: string): Observable<boolean> {
        const params: HttpParams = new HttpParams().set('patientId', patientId).set('medicineId', medicineId);
        return this._http.get<boolean>(`/medicines/is-assigned`, { params });
    }

    public createTreatment(treatment: DermaTreatmentModel): Observable<void> {
        return this._http.post<void>(`${this.endPoint}/new/`, treatment);
    }

    public updateTreatment(treatment: DermaTreatmentModel): Observable<void> {
        return this._http.post<void>(`${this.endPoint}/update/`, treatment);
    }

    public suspendTreatment(treatment: DermaTreatmentModel): Observable<void> {
        return this._http.post<void>(`${this.endPoint}/suspend`, treatment);
    }

    public deleteTreatment(treatmentId: string): Observable<void> {
        return this._http.delete<void>(`${this.endPoint}/delete/${treatmentId}`);
    }
}
