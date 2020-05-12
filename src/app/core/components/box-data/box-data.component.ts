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
    const customFields = {
      fullName: this.calculateFullName(object),
      age: this.calculateAge(object),
      genderCode: this.showGender(object),
    };

    const valuetoPrint = customFields[key]
      ? customFields[key]
      : object[key]
      ? object[key]
      : '';
    return valuetoPrint;
  }

  private calculateFullName(object: PatientModel): string {
    const fullName = `${object.name} ${object.firstSurname} ${object.lastSurname}`;
    return object ? fullName : '';
  }

  private calculateAge(object: PatientModel): number {
    const today = Date.now();
    const birthDate = new Date(object.birthDate);
    const ageDate = new Date(today - birthDate.getTime());
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return object.birthDate ? age : null;
  }

  private showGender(object: PatientModel): string {
    const gender = object.genderCode === 'F' ? 'female' : 'male';
    return object.genderCode ? gender : '';
  }

  public showKey(key: string): string {
    return this.keysNotShow[key] ? '' : key;
  }

  public parserDataToShowInTooltip() {
    let text = '';

    if (this.currentData.hospital) {
      text = `${this.currentData.hospital.name} | ${this.currentData.address} | ${this.currentData.email}`;
    }

    return text;
  }
}
