import { Injectable } from '@angular/core';
import { RowDataModel } from 'src/app/core/models/table/row-data.model';
import { PatientModel } from '../models/patients/patient.model';

@Injectable({
  providedIn: 'root',
})
export class PatientModelToRowModelAdapter {
  constructor() {}

  public adaptModelToRow(patient: PatientModel): RowDataModel {
    const row = new RowDataModel();
    row.pushColumn(
      patient.name
        .concat(' ')
        .concat(patient.firstSurname)
        .concat(' ')
        .concat(patient.lastSurname)
    );
    row.pushColumn(patient.nhc);
    row.pushColumn(patient.healthCard);
    row.pushColumn(patient.dni);
    row.pushColumn(patient.phone);
    row.pushColumn(patient.genderCode);
    let pathologyList = '';
    patient.pathologies.forEach((pathology) => {
      pathologyList = pathologyList.concat(pathology.name).concat(';');
    });
    row.pushColumn(pathologyList);
    return row;
  }
}
