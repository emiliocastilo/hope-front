import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersModel } from '../../models/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _http: HttpClient) {}

  getAll(query: string): Observable<any> {
    query = query ? query : '';
    return this._http.get(`/users?${query}`);
  }

  findUsers(search: string): Observable<any> {
    return this._http.get('/users/searches?search=' + search);
  }

  postUser(user: UsersModel): Observable<any> {
    return this._http.post('/users', user);
  }

  deleteUser(id: number): Observable<any> {
    return this._http.delete(`/users/${id}`);
  }

  updateUser(user: UsersModel): Observable<any> {
    return this._http.put('/users', user);
  }
}
