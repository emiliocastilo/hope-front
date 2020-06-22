import { Component } from '@angular/core';
import { constants } from '../../../../../../constants/constants';

@Component({
  selector: 'app-adherence-to-treatment',
  templateUrl: './adherence-to-treatment.component.html',
  styleUrls: ['./adherence-to-treatment.component.scss'],
})
export class AdherenceToTreatmentComponent {
  key = constants.KEY_ADHERENCETOTREATMENT;
}
