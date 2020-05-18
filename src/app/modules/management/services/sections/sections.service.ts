import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SectionModel } from '../../models/section.model';

@Injectable({
  providedIn: 'root',
})
export class SectionsService {
  constructor(private _httpClient: HttpClient) {}

  public getSections(): Observable<any> {
    return this._httpClient.get(`/sections`);
  }

  public getSectionsById(id: string): Observable<any> {
    return this._httpClient.get(`/sections/searches?search=${id}`);
  }

  public createSection(request: SectionModel): Observable<any> {
    return this._httpClient.post('/sections', request);
  }

  public updateSection(request: SectionModel): Observable<any> {
    return this._httpClient.put('/sections', request);
  }

  public deleteSection(id: number): Observable<any> {
    return this._httpClient.delete(`/sections/${id}`);
  }
}
