import { Injectable } from '@angular/core';
import { RowDataModel } from 'src/app/core/models/table/row-data.model';
import { PatientModel } from '../models/patient.model';
import { ColumnDataModel } from 'src/app/core/models/table/colum-data.model';
import { ColumnDataType } from 'src/app/core/models/table/column-data-type.model';

@Injectable({
  providedIn: 'root',
})
export class PatientModelToRowModelAdapter {
  constructor() {}

  public adaptModelToRow(patient: PatientModel): RowDataModel {
    /*const row = new RowDataModel();
    row.pushColumn(new ColumnDataModel('text',
      patient.name
        .concat(' ')
        .concat(patient.firstSurname)
        .concat(' ')
        .concat(patient.lastSurname)
    ));
    row.pushColumn(new ColumnDataModel('text', patient.nhc));
    row.pushColumn(new ColumnDataModel('text', patient.healthCard));
    row.pushColumn(new ColumnDataModel('text', patient.dni));
    row.pushColumn(new ColumnDataModel('text', patient.genderCode));
    row.pushColumn(new ColumnDataModel('text', patient.genderCode));
    let pathologyList = '';
    patient.pathologies.forEach((pathology) => {
      pathologyList = pathologyList.concat(pathology.name).concat(';');
    });
    row.pushColumn(new ColumnDataModel('text', pathologyList));
    row.pushColumn(new ColumnDataModel('iconButtons', {
      iconButtons: [
        {
          type: 'edit',
          icon: 'fa2x fa-pencil'
        },{
          type: 'delete',
          icon: 'fa2x fa-window-close'
        }
      ]
    }));
    return row;*/
    return null;
  }
}
