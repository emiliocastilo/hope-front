import { Component, OnInit, Input } from '@angular/core';

import { PatientModel } from '../../../../models/patient.model';

@Component({
  selector: 'app-patient-header',
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.scss'],
})
export class PatientHeaderComponent implements OnInit {
  @Input() patient: PatientModel;

  constructor() {}

  ngOnInit(): void {}
}
