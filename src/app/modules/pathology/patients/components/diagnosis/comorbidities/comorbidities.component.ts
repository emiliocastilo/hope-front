import { Component } from '@angular/core';
import { constants } from '../../../../../../../constants/constants';

@Component({
    selector: 'app-comorbidities',
    templateUrl: './comorbidities.component.html',
    styleUrls: ['./comorbidities.component.scss'],
})
export class ComorbiditiesComponent {
    key = constants.keyComorbidities;
}
