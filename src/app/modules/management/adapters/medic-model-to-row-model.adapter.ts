import { Injectable } from '@angular/core';
import { RowDataModel } from 'src/app/core/models/table/row-data.model';
import { MedicModel } from '../models/medic/medic.model';
import { ColumnDataModel } from 'src/app/core/models/table/colum-data.model';

@Injectable({
  providedIn: 'root',
})
export class MedicModelToRowModelAdapter {
  constructor() {}

  public adaptModelToRow(medic: MedicModel): RowDataModel {
    const row = new RowDataModel();
    row.pushColumn(new ColumnDataModel('text', medic.name));
    row.pushColumn(new ColumnDataModel('text', medic.surname));
    row.pushColumn(new ColumnDataModel('text', medic.dni));
    row.pushColumn(new ColumnDataModel('text', medic.phone));
    row.pushColumn(new ColumnDataModel('text', medic.collegeNumber));
    row.pushColumn(new ColumnDataModel('iconButtons', {
      iconButtons: [
        {
          type: 'edit',
          icon: 'fa-lg fa-pencil'
        },{
          type: 'delete',
          icon: 'fa-lg fa-window-close cfa-red'
        }
      ]
    }));
    return row;
  }
}
