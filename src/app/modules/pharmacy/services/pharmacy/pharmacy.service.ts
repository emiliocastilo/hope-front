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
    constructor(private _http: HttpClient) {}

    getData(currentPage: number = 0): Observable<QueryResult<PharmacyModel>> {
        return this._http.get<QueryResult<PharmacyModel>>(`${this.endpoint}?page=${currentPage}`);
    }

    getById(id: number): Observable<PharmacyModel> {
        return this._http.get<PharmacyModel>(`${this.endpoint}/${id}`);
    }

    getSearch(queryParams: string, search?: string) {
        if (!queryParams) {
            queryParams = `?page=0`;
        }
        if (search) {
            queryParams += `&search=${search}`;
        }
        return this._http.get<QueryResult<PharmacyModel>>(`${this.endpoint}${queryParams}`);
    }
}
