import { Component } from '@angular/core';
import { constants } from '../../../../../../constants/constants';

@Component({
  selector: 'app-shared-patients',
  templateUrl: './shared-patients.component.html',
  styleUrls: ['./shared-patients.component.scss'],
})
export class SharedPatientsComponent {
  key = constants.keySharedPatient;
}
