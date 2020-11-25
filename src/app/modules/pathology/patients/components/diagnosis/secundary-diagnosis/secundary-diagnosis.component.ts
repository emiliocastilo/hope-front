import { Component } from '@angular/core';
import { constants } from '../../../../../../../constants/constants';

@Component({
  selector: 'app-secundary-diagnosis',
  templateUrl: './secundary-diagnosis.component.html',
  styleUrls: ['./secundary-diagnosis.component.scss'],
})
export class SecundaryDiagnosisComponent {
  key = constants.keySecundaryDiagnosis;
}
