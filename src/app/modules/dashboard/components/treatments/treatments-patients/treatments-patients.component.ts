import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-treatments-patients',
  templateUrl: './treatments-patients.component.html',
  styleUrls: ['./treatments-patients.component.scss'],
})
export class TreatmentsPatientsComponent implements OnInit {
  entries = [
    {
      name: 'patientsTreatmentPsoriasisPlacas',
      url: 'dashboard/treatments/treatments-patients/psoriasis-placas',
    },
    {
      name: 'patientsTreatmentPsoriasisPalmoPlantar',
      url: 'dashboard/treatments/treatments-patients/psoriasis-palmo-plantar',
    },
    {
      name: 'patientsTreatmentEritrodermia',
      url: 'dashboard/treatments/treatments-patients/eritrodermia',
    },
    {
      name: 'patientsTreatmentPsoriasisPustulosa',
      url: 'dashboard/treatments/treatments-patients/psoriasis-pustulosa',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
