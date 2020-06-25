import { Component } from '@angular/core';
import { constants } from '../../../../../../constants/constants';

@Component({
  selector: 'app-physical-condition',
  templateUrl: './physical-condition.component.html',
  styleUrls: ['./physical-condition.component.scss'],
})
export class PhysicalConditionComponent {
  key = constants.keyPhysicalCondition;
}
