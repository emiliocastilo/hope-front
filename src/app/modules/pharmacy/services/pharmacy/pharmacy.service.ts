import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryResult } from '../../../management/interfaces/query-result.interface';
import { PharmacyModel } from '../../models/pharmacy/pharmacy.model';

@Injectable({
    providedIn: 'root',
})
export class PharmacyService {
    private endpoint = '/pharmacy';
    constructor(private _http: HttpClient) { }

    get (queryParams?: string): Observable<QueryResult<PharmacyModel>> {
        return this._http.get<QueryResult<PharmacyModel>>(`${this.endpoint}${queryParams ? queryParams : ''}`);
    }

    getById (id: number): Observable<PharmacyModel> {
        return this._http.get<PharmacyModel>(`${this.endpoint}/${id}`);
    }

    getSearch (pathology: string, search?: string) {
        return this._http.get<QueryResult<PharmacyModel>>(`${this.endpoint}/searches?search=${search}`);
    }
}
