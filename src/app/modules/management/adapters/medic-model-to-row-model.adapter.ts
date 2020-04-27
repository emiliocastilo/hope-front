import { Injectable } from '@angular/core';
import { RowDataModel } from 'src/app/core/models/table/row-data.model';
import { MedicModel } from '../models/medic.model';

@Injectable({
  providedIn: 'root',
})
export class MedicModelToRowModelAdapter {
  constructor() {}

  public adaptModelToRow(medic: MedicModel): RowDataModel {
    const row = new RowDataModel();
    row.pushColumn(medic.name);
    row.pushColumn(medic.surname);
    row.pushColumn(medic.dni);
    row.pushColumn(medic.phone);
    row.pushColumn(medic.collegeNumber);

    return row;
  }
}
