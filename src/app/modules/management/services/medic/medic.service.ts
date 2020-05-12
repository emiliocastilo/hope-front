import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MedicModel } from '../../models/medic/medic.model';

@Injectable({
  providedIn: 'root',
})
export class MedicService {
  constructor(private _http: HttpClient) {}

  getAll(query: string): Observable<any> {
    query = query ? query : '';
    return this._http.get(`/doctors?${query}`);
  }

  findDoctors(medicModel: string): Observable<any> {
    return this._http.get('/doctors/searches?search=' + medicModel);
  }

  postDoctor(medicModel: MedicModel): Observable<any> {
    return this._http.post('/doctors', medicModel);
  }

  deleteDoctor(id: number): Observable<any> {
    return this._http.delete(`/doctors/${id}`);
  }

  updateDoctor(medicModel: MedicModel): Observable<any> {
    return this._http.put('/doctors', medicModel);
  }
}
