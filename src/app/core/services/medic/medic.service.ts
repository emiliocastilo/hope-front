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
    return this._http.get(`/doctor?${query}`);
  }

  findDoctors(medicModel: string): Observable<any> {
    console.log('medicModel:', medicModel);
    return this._http.get('/doctor/findDoctorsBySearch?search=' + medicModel);
  }

  postDoctor(medicModel: MedicModel): Observable<any> {
    console.log('medicModel:', medicModel);
    return this._http.post('/doctor', medicModel);
  }

  deleteDoctor(id: number): Observable<any> {
    return this._http.delete(`/doctor/${id}`);
  }

  updateDoctor(medicModel: MedicModel): Observable<any> {
    return this._http.put('/doctor', medicModel);
  }
}
