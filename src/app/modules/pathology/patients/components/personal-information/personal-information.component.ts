import { Component, OnInit } from '@angular/core';
import { PatientModel } from '../../models/patient.model';
import { PatientsService } from 'src/app/modules/management/services/patients/patients.service';
import FormUtils from 'src/app/core/utils/FormUtils';
import StringUtils from '../../../../../core/utils/StringUtils';
import { FieldConfig } from '../../../../../core/interfaces/dynamic-forms/field-config.interface';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss'],
})
export class PersonalInformationComponent implements OnInit {
  public patients: PatientModel[] = [];
  public patientKeysToShowRow: string[] = [
    'name',
    'nhc',
    'healthCard',
    'dni',
    'phone',
    'genderCode',
  ];
  public patientKeysToShow: string[] = [
    'name',
    'nhc',
    'healthCard',
    'dni',
    'address',
    'phone',
    'email',
    'genderCode',
    'birthDate',
    'age',
  ];
  public selectedItem: number;
  public selectedPatient: PatientModel = {
    id: '',
    name: '',
    firstSurname: '',
    lastSurname: '',
    nhc: '',
    healthCard: '',
    dni: '',
    address: '',
    phone: '',
    email: '',
    birthDate: '',
    hospital: null,
    genderCode: '',
    pathologies: [],
  };

  public gender: string;
  public config: FieldConfig[] = [];

  constructor(
    private _patientService: PatientsService,
    private _translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.selectedPatient = JSON.parse(localStorage.getItem('selectedPatient'));
    let listFields: any = [
      {
        type: 'title',
        name: this._translate.instant('personalData'),
      },
    ];

    this.patientKeysToShow.forEach((key) => {
      const object = {
        disabled: true,
        label: this._translate.instant(key),
        type: 'input',
        name: key,
        value: this.getValue(key),
      };
      listFields.push(object);
    });
    listFields = JSON.stringify(listFields);
    const form = this._parseStringToJSON(listFields);
    this.config = FormUtils.createFieldConfig(form);

    this._patientService
      .getPatientsById(this.selectedPatient.id)
      .subscribe((data) => {
        if (data) {
          this.selectedPatient = data;
        }
      });
  }

  private getValue(key) {
    if (key === 'name') {
      return `${this.selectedPatient.name} ${this.selectedPatient.firstSurname} ${this.selectedPatient.lastSurname}`;
    } else if (key === 'genderCode') {
      return this.selectedPatient[key] === 'M'
        ? '♂'.toUpperCase()
        : '♀'.toUpperCase();
    } else if (key === 'birthDate') {
      return moment(this.selectedPatient[key]).format('DD/MM/YYYY');
    } else if (key === 'age') {
      return this.getAge(this.selectedPatient.birthDate);
    }
    return this.selectedPatient[key];
  }

  private _parseStringToJSON(form: string): JSON {
    return JSON.parse(StringUtils.replaceAllSimpleToDoubleQuotes(form));
  }

  private getAge(age) {
    const array = [age];
    const valueAge = FormUtils.ageBybirthdate(array);
    return valueAge;
  }
}
