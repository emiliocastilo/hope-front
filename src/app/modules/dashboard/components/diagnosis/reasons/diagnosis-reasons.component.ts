import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diagnosis-reasons',
  templateUrl: './diagnosis-reasons.component.html',
  styleUrls: ['./diagnosis-reasons.component.scss'],
})
export class DiagnosisReasonsComponent implements OnInit {
  options = [
    {
      name: 'Motivo del último cambio de tratamiento biológico',
      url:
        'dashboard/diagnosis/reasons/reason-last-change-biological-treatment',
    },
    {
      name: 'Motivo de la última suspensión de tratamiento biológico',
      url: 'dashboard/diagnosis/reasons/reason-stop-bioligical-treatment',
    },
    {
      name: 'Motivo del cambio de tratamiento biológico de los últimos 5 años',
      url:
        'dashboard/diagnosis/reasons/reason-change-biological-treatment-five-years',
    },
    {
      name:
        'Motivo de la suspensión de tratamiento biológico de los últimos 5 años',
      url:
        'dashboard/diagnosis/reasons/reason-stop-biological-treatment-five-years',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  handleChange(event) {
    const url = event.target.value;
    this.router.navigate([url]);
  }
}
