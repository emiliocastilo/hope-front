import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IndicationModel } from '../../models/indication/indication.model';

@Injectable({
    providedIn: 'root',
})
export class IndicationService {
    constructor(private _http: HttpClient) {}

    getList(): Observable<Array<IndicationModel>> {
        return this._http.get<Array<IndicationModel>>('/indications');
    }
}
