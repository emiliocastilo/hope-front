import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PatientModel } from 'src/app/modules/pathology/patients/models/patient.model';

@Component({
  selector: 'app-box-data',
  templateUrl: './box-data.component.html',
  styleUrls: ['./box-data.component.scss'],
})
export class BoxDataComponent implements OnInit {
  @Input() data: any = {};
  @Input() keysToShow: string[] = [];
  public gender: string;

  constructor(public _translate: TranslateService) {}

  public currentData: PatientModel;
  private keysNotShow: any = {
    fullName: true,
  };

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    this.currentData = changes.data
      ? changes.data.currentValue
      : JSON.parse(localStorage.getItem('selectedUser') || '{}');
  }

  public parsedata(object: PatientModel, key: string): string {
    const valuetoPrint = object[key] ? object[key] : '';
    return valuetoPrint;
  }

  public showKey(key: string): string {
    return this.keysNotShow[key] ? '' : key;
  }

  public parserDataToShowInTooltip() {
    let text = '';

    if (this.currentData.hospital) {
      text = `${this.currentData.hospital.name}`;
    }
    if (this.currentData.address) {
      text += ` | ${this.currentData.address}`;
    }
    if (this.currentData.email) {
      text += ` | ${this.currentData.email}`;
    }

    return text;
  }

  public back() {
    window.history.back();
  }
}
