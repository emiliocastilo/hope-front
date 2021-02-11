import { Component } from '@angular/core';
import { constants } from '../../../../../../../constants/constants';

@Component({
    selector: 'app-diagnosis',
    templateUrl: './diagnosis.component.html',
    styleUrls: ['./diagnosis.component.scss'],
})
export class DiagnosisComponent {
    key = constants.keyDiagnosis;
}
