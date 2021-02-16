import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/core/models/pagination/pagination/pagination.model';

@Injectable({
    providedIn: 'root',
})
export class DermaTreatmentsService {
    constructor(private _http: HttpClient) {}

    private readonly endPoint = '/patients-treatments/find-all-treatments';

    public getAll(patientId: string): Observable<Pagination<any>> {
        const params: HttpParams = new HttpParams().set('patientId', patientId);
        return this._http.get<any>('/patients-treatments/find-by-patient', { params });
    }

    public createTreatment(patientId: string, treatment: any): Observable<void> {
        return this._http.put<void>(`${this.endPoint}/${patientId}`, treatment);
    }

    public updateTreatment(patientId: string, treatment: any): Observable<void> {
        return this._http.post<void>(`${this.endPoint}/${patientId}`, treatment);
    }

    public suspendTreatment(patientId: string, treatment: any): Observable<void> {
        return this._http.post<void>(`${this.endPoint}/${patientId}/suspend`, treatment);
    }

    public deleteTreatment(patientId: string, treatmentId: string): Observable<void> {
        return this._http.delete<void>(`${this.endPoint}/${patientId}/${treatmentId}`);
    }
}
