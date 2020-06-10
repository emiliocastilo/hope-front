import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor(private _translate: TranslateService) {}

  private excelExtension = '.xlsx';

  private excelType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

  private translateData(json: any): any {
    const parseJson = {};
    Object.keys(json).forEach((key: string) => {
      parseJson[this._translate.instant(key)] = json[key];
    });
    return parseJson;
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const parseData = json.map((value: any) => {
      return this.translateData(value);
    });
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(parseData);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.excelType });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + this.excelExtension
    );
  }
}
