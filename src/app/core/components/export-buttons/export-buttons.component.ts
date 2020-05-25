import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-export-buttons',
  templateUrl: './export-buttons.component.html',
  styleUrls: ['./export-buttons.component.scss'],
})
export class ExportButtonsComponent implements OnInit {
  @Input() dataToExport: any = [];
  constructor(public _translate: TranslateService) {}

  ngOnInit(): void {}

  exportToPDF() {
    window.print();
  }

  exportToExcel() {
    console.log('to excel', this.dataToExport);
  }
}
