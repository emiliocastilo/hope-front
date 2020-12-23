import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FileManagementService {
    private endpoint: string = '/';
    private allowedExtensions: Array<string> = ['pdf'];

    constructor(private _http: HttpClient) { }

    getFile (): Observable<Array<File>> {
        return this._http.get<Array<File>>(`${this.endpoint}`);
    }

    uploadFile (file: File) {
        return this._http.post(`${this.endpoint}`, file);
    }
}