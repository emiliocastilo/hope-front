import { Component } from '@angular/core';
import { constants } from '../../../../../../constants/constants';

@Component({
  selector: 'app-evaluation-status-physical',
  templateUrl: './evaluation-status-physical.component.html',
  styleUrls: ['./evaluation-status-physical.component.scss'],
})
export class EvaluationStatusPhysicalComponent {
  key = constants.KEY_EVALUATIONSTATUSPHYSICAL;
}
