import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FileManagementService {
    private endpoint: string = '';
    private allowedExtensions: Array<string> = ['pdf'];

    constructor(private _http: HttpClient) { }

    getFile (query: string): Observable<any> {
        return this._http.get(`/medicines?${query}`);
    }

    uploadFile (query: string) {
        return this._http.get(`/medicines/doses?${query}`).toPromise();
    }
}