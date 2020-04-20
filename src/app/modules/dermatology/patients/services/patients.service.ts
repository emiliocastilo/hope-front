import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientModel } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(private _httpClient:HttpClient) { }

  public getPatients():Observable<any>{
    return this._httpClient.get("/patient");
  }

}
