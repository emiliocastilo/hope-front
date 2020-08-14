import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../../../../core/models/user/user.model';
import { UsersModel } from '../../models/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _http: HttpClient) {}

  getAll(query: string): Observable<any> {
    query = query ? query : '';
    return this._http.get(`/doctors?${query}`);
  }

  findUsers(UserModel: string): Observable<any> {
    return this._http.get('/doctors/searches?search=' + UserModel);
  }

  postUser(UserModel: UserModel): Observable<any> {
    return this._http.post('/doctors', UserModel);
  }

  deleteUser(id: number): Observable<any> {
    return this._http.delete(`/doctors/${id}`);
  }

  updateUser(UserModel: UsersModel): Observable<any> {
    return this._http.put('/doctors', UserModel);
  }
}
