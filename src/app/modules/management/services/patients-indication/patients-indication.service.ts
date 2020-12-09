import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PatientsIndicationService {
    constructor(private _http: HttpClient) {}

    getChart(): Observable<any> {
        return this._http.get('/patients-diagnoses/indications');
    }

    getDetails(query: string): Observable<any> {
        query = query ? query : 'page=0';
        return this._http.get(`/patients-diagnoses/indications/patients?${query}`);
    }

    getDetailsExport(query: string): Observable<any> {
        return this._http.get(`/patients-diagnoses/indications/patients-export?${query}`);
    }

    getPatiensDiagnosesByIndications(): Observable<any> {
        return this._http.get(`/patients-diagnoses/indications?`);
    }
}
