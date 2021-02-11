import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CalculatedBackService {
    constructor(private http: HttpClient) {}

    public calculateFieldInBack(endPoint: string, body: any): Observable<string> {
        return this.http.post<string>(endPoint, body);
    }
}
