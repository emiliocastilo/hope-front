import { Component } from '@angular/core';
import { constants } from '../../../../../../constants/constants';

@Component({
  selector: 'app-adherence-to-treatment-morisky',
  templateUrl: './adherence-to-treatment-morisky.component.html',
  styleUrls: ['./adherence-to-treatment-morisky.component.scss'],
})
export class AdherenceToTreatmentMoriskyComponent {
  key = constants.keyAdherenceToTreatmentMorisky;
}
