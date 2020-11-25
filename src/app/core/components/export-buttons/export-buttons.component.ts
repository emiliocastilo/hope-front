import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ExcelService } from 'src/app/core/services/excel.service';

@Component({
  selector: 'app-export-buttons',
  templateUrl: './export-buttons.component.html',
  styleUrls: ['./export-buttons.component.scss'],
})
export class ExportButtonsComponent implements OnInit {
  @Input() dataToExport: any = [];
  constructor(public _translate: TranslateService) {}

  ngOnInit(): void {}

  public exportToPDF() {
    window.print();
  }

  public exportToExcel() {
    new ExcelService(this._translate).exportAsExcelFile(
      this.dataToExport,
      'hopes_chart_table'
    );
  }
}
