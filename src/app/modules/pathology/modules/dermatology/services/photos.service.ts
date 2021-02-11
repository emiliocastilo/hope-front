import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PhotoModel } from '../models/photo.model';

@Injectable({
    providedIn: 'root',
})
export class PhotosService {
    constructor(private _httpClient: HttpClient) {}

    public getPhotos(patient: number, pathology: number): Observable<any> {
        return this._httpClient.get(`/photos?pac=${patient}&pth=${pathology}`);
    }

    public getPhoto(id: number) {
        return this._httpClient.get(`/photos/${id}`);
    }

    public addPhoto(photo: PhotoModel) {
        return this._httpClient.post('/photos', photo);
    }

    public editPhoto(photo: PhotoModel) {
        return this._httpClient.put('/photos', photo);
    }

    public deletePhoto(id: number) {
        return this._httpClient.delete(`/photos/${id}`);
    }

    public deletePhotos() {
        return this._httpClient.delete('/photos');
    }

    public generateQR(patient: number, pathology: number) {
        return this._httpClient.get(`/photos/qr?pac=${patient}&pth=${pathology}`, {
            responseType: 'text',
        });
    }
}
