import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DermaTreatmentsService {
    constructor(private _http: HttpClient) {}

    getAll(): Observable<any> {
        return this._http.get(`/patients-treatments/find-all-treatments`);
    }
}
