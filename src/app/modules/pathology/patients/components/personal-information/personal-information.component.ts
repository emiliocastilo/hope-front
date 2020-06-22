import { Component, OnInit } from '@angular/core';
import { PatientModel } from '../../models/patient.model';
import { PatientsService } from 'src/app/modules/management/services/patients/patients.service';
import FormUtils from 'src/app/core/utils/FormUtils';

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

  constructor(private _patientService: PatientsService) {}

  ngOnInit(): void {
    this.selectedPatient = JSON.parse(localStorage.getItem('selectedUser'));
    this._patientService
      .getPatientsById(this.selectedPatient.id)
      .subscribe((data) => {
        if (data) {
          this.selectedPatient = data;
        }
      });
  }

  public getNameLastName(): string {
    return `${this.selectedPatient.name} ${this.selectedPatient.firstSurname} ${this.selectedPatient.lastSurname}`;
  }

  private getAge(age) {
    const array = [age];
    const valueAge = FormUtils.ageBybirthdate(array);
    return valueAge;
  }
}
