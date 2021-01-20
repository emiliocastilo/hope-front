import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QueryResult } from '../../management/interfaces/query-result.interface';
import { PatientTreatmentModel } from '../models/patient-treatment.model';

@Injectable({
    providedIn: 'root',
})
export class PatientTreatmentService {
    private endpoint = '/patient-treatments';
    constructor(private _http: HttpClient) {}

    get(queryParams?: string): Observable<QueryResult<PatientTreatmentModel>> {
        return this._http.get<QueryResult<PatientTreatmentModel>>(`${this.endpoint}${queryParams ? queryParams : ''}`);
    }

    search(search?: string): Observable<QueryResult<PatientTreatmentModel>> {
        return this._http.get<QueryResult<PatientTreatmentModel>>(`${this.endpoint}/searches?search=${search}`);
    }

    change() {}

    modify() {}

    delete(id: number): Observable<PatientTreatmentModel> {
        return this._http.delete<PatientTreatmentModel>(`${this.endpoint}/${id}`);
    }
}
