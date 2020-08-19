import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-treatments-patients',
  templateUrl: './treatments-patients.component.html',
  styleUrls: ['./treatments-patients.component.scss'],
})
export class TreatmentsPatientsComponent implements OnInit {
  options = [
    {
      name: 'Psoriasis en placas',
      url: 'dashboard/treatments/treatments-patients/psoriasis-placas',
    },
    {
      name: 'Psoriasis palmoplantar',
      url: 'dashboard/treatments/treatments-patients/psoriasis-palmo-plantar',
    },
    {
      name: 'Eritrodermia',
      url: 'dashboard/treatments/treatments-patients/eritrodermia',
    },
    {
      name: 'Psoriasis pustulosa',
      url: 'dashboard/treatments/treatments-patients/psoriasis-pustulosa',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  handleChange(event) {
    const url = event.target.value;
    this.router.navigate([url]);
  }
}
