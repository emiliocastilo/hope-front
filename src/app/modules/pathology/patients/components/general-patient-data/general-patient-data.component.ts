import { Component } from '@angular/core';
import { constants } from '../../../../../../constants/constants';

@Component({
  selector: 'app-general-patient-data',
  templateUrl: './general-patient-data.component.html',
  styleUrls: ['./general-patient-data.component.scss'],
})
export class GeneralPatientDataComponent {
  key = constants.keyGeneralPatientData;
}
