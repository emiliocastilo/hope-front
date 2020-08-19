import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diagnosis-reasons',
  templateUrl: './diagnosis-reasons.component.html',
  styleUrls: ['./diagnosis-reasons.component.scss'],
})
export class DiagnosisReasonsComponent implements OnInit {
  entries = [
    {
      name: 'reasonLastChangeBiologicalTreatment',
      url:
        'dashboard/diagnosis/reasons/reason-last-change-biological-treatment',
    },
    {
      name: 'reasonStopBiologicalTreatment',
      url: 'dashboard/diagnosis/reasons/reason-stop-bioligical-treatment',
    },
    {
      name: 'reasonChangeBiologicalTreatmentFiveYears',
      url:
        'dashboard/diagnosis/reasons/reason-change-biological-treatment-five-years',
    },
    {
      name: 'reasonStopBiologicalTreatmentFiveYears',
      url:
        'dashboard/diagnosis/reasons/reason-stop-biological-treatment-five-years',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
