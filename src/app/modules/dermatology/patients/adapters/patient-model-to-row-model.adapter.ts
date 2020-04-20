import { Injectable } from '@angular/core';
import { RowDataModel } from 'src/app/core/models/table/row-data.model';
import { PatientModel } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientModelToRowModelAdapter {

  constructor() { }

  public adaptModelToRow(patient:PatientModel):RowDataModel{
    let row = new RowDataModel();
    row.pushColumn(patient.name.concat(' ')
      .concat(patient.firstName)
      .concat(' ')
      .concat(patient.lastSurname));
    row.pushColumn(patient.nhc);
    row.pushColumn(patient.healthCard);
    row.pushColumn(patient.dni);
    row.pushColumn(patient.phone);
    row.pushColumn(patient.genderCode);
    let pathologyList:string = ''; 
    patient.pathologies.forEach(
      (pathology) => {
        pathologyList = pathologyList.concat(pathology['name']).concat(';')
      }
    );
    row.pushColumn(pathologyList);
    return row;
  }
}
