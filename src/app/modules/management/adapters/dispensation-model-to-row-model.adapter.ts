import { Injectable } from '@angular/core';
import { RowDataModel } from 'src/app/core/models/table/row-data.model';
import { DispensationModel } from '../models/dispensation/dispensation.model';
import { ColumnDataModel } from 'src/app/core/models/table/colum-data.model';

@Injectable({
  providedIn: 'root',
})
export class DispensationModelToRowModelAdapter {
  constructor() {}

  public adaptModelToRow(dispensation: DispensationModel): RowDataModel {
    const row = new RowDataModel();
    row.pushColumn(new ColumnDataModel('text', dispensation.date));
    row.pushColumn(new ColumnDataModel('text', dispensation.startPeriod));
    row.pushColumn(new ColumnDataModel('text', dispensation.endPeriod));
    row.pushColumn(new ColumnDataModel('text', dispensation.numRecords));
    row.pushColumn(
      new ColumnDataModel('iconButtons', {
        iconButtons: [
          {
            type: 'details',
            icon: 'fa-lg fa-search cfa-blue',
          },
          {
            type: 'delete',
            icon: 'fa-lg fa-window-close cfa-red',
          },
        ],
      })
    );
    return row;
  }
}
