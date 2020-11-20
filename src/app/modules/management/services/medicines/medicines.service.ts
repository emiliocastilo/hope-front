import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QueryResult } from '../../interfaces/query-result.interface';
import { MedicineModel } from '../../models/medicines/medicines.model';

@Injectable({
  providedIn: 'root',
})
export class MedicinesService {
  private endpoint = '/medicines';
  constructor(private _http: HttpClient) {}

  get(queryParams?: string): Observable<QueryResult<MedicineModel>> {
    if (!queryParams) queryParams = '';
    return this._http.get<QueryResult<MedicineModel>>(
      `${this.endpoint}${queryParams}`
    );
  }

  getById(id: number): Observable<MedicineModel> {
    return this._http.get<MedicineModel>(`${this.endpoint}/${id}`);
  }

  getSearch(search?: string) {
    return this._http.get<QueryResult<MedicineModel>>(
      `${this.endpoint}/searches?search=${search}`
    );
  }

  create(medicine: MedicineModel): Observable<MedicineModel> {
    return this._http.post<MedicineModel>(`${this.endpoint}`, medicine);
  }

  update(id: number, medicine: MedicineModel): Observable<MedicineModel> {
    return this._http.put<MedicineModel>(`${this.endpoint}/${id}`, medicine);
  }

  delete(id: number): Observable<MedicineModel> {
    return this._http.delete<MedicineModel>(`${this.endpoint}/${id}`);
  }

  saveFromFile(medicineModel: any): any {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', localStorage.getItem('token'));

    const formdata = new FormData();
    formdata.append(
      'multipartFile',
      medicineModel.fileMedicine,
      medicineModel.fileMedicine.name
    );
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
    };
    return fetch(`${environment.URL_API}/medicines/createAll`, requestOptions);
  }
}
