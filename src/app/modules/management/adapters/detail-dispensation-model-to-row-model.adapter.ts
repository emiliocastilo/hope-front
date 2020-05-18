import { Injectable } from '@angular/core';
import { RowDataModel } from 'src/app/core/models/table/row-data.model';
import { DetailDispensationModel } from '../models/dispensation/detail-dispensation.model';
import { ColumnDataModel } from 'src/app/core/models/table/colum-data.model';

@Injectable({
  providedIn: 'root',
})
export class DetailDispensationModelToRowModelAdapter {
  constructor() {}

  public adaptModelToRow(dispensation: DetailDispensationModel): RowDataModel {
    const row = new RowDataModel();
    row.pushColumn(new ColumnDataModel('text', dispensation.date));
    row.pushColumn(new ColumnDataModel('text', dispensation.nhc));
    row.pushColumn(new ColumnDataModel('text', dispensation.code));
    row.pushColumn(new ColumnDataModel('text', dispensation.nationalCode));
    row.pushColumn(new ColumnDataModel('text', dispensation.description));
    row.pushColumn(new ColumnDataModel('text', dispensation.quantity));
    row.pushColumn(new ColumnDataModel('text', dispensation.amount));
    row.pushColumn(new ColumnDataModel('text', dispensation.daysDispensation));
    return row;
  }
}
