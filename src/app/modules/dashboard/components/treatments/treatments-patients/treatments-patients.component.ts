import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-treatments-patients',
  templateUrl: './treatments-patients.component.html',
  styleUrls: ['./treatments-patients.component.scss'],
})
export class TreatmentsPatientsComponent implements OnInit {
  entries = [
    {
      name: 'psoriasisPlacas',
      url: 'dashboard/treatments/treatments-patients/psoriasis-placas',
    },
    {
      name: 'psoriasisPalmoplantar',
      url: 'dashboard/treatments/treatments-patients/psoriasis-palmo-plantar',
    },
    {
      name: 'eritrodermia',
      url: 'dashboard/treatments/treatments-patients/eritrodermia',
    },
    {
      name: 'psoriasisPustulosa',
      url: 'dashboard/treatments/treatments-patients/psoriasis-pustulosa',
    },
  ];
  config = {};

  constructor() {}

  ngOnInit(): void {}
}
