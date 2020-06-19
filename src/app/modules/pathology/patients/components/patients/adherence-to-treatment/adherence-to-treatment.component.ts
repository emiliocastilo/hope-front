import { Component, Input, OnInit } from '@angular/core';
import { constants } from '../../../../../../../constants/constants';

@Component({
  selector: 'app-adherence-to-treatment',
  templateUrl: './adherence-to-treatment.component.html',
  styleUrls: ['./adherence-to-treatment.component.scss'],
})
export class AdherenceToTreatmentComponent implements OnInit {
  @Input() key = constants.KEY_ADHERENCETOTREATMENT;
  constructor() {}

  ngOnInit(): void {}
}
