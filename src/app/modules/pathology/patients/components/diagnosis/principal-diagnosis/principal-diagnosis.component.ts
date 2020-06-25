import { Component } from '@angular/core';
import { constants } from '../../../../../../../constants/constants';

@Component({
  selector: 'app-principal-diagnosis',
  templateUrl: './principal-diagnosis.component.html',
  styleUrls: ['./principal-diagnosis.component.scss'],
})
export class PrincipalDiagnosisComponent {
  key = constants.keyPrincipalDiagnosis;
}
