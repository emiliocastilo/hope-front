import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileModel } from '../../models/file/file.model';

@Injectable({
    providedIn: 'root',
})
export class FileManagementService {
    private endpoint: string = '/';
    private allowedExtensions: Array<string> = ['pdf'];

    constructor(private _http: HttpClient) { }

    getFile (): Observable<Array<FileModel>> {
        return this._http.get<Array<FileModel>>(`${this.endpoint}`);
    }

    uploadFile (file: FileModel) {
        return this._http.post(`${this.endpoint}`, file);
    }
}