import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DispensationModel } from '../../models/dispensation/dispensation.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class DispensationService {
    constructor(private _http: HttpClient) {}

    getAll(query: string): Observable<any> {
        query = query ? query : '';
        return this._http.get(`/dispensations?${query}`);
    }

    getDetailsById(query: string): Observable<any> {
        query = query ? query : '';
        return this._http.get(`/dispensation-details?${query}`);
    }

    save(dispensationModel: DispensationModel): any {
        const myHeaders = new Headers();
        myHeaders.append('Authorization', localStorage.getItem('token'));

        const formdata = new FormData();
        formdata.append('fileDispensation', dispensationModel.fileDispensation, dispensationModel.fileDispensation.name);
        formdata.append('startPeriod', dispensationModel.startPeriod);
        formdata.append('endPeriod', dispensationModel.endPeriod);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
        };

        return fetch(`${environment.URL_API}/dispensations`, requestOptions);
    }

    delete(id: number): Observable<any> {
        return this._http.delete(`/dispensations/${id}`);
    }
}
