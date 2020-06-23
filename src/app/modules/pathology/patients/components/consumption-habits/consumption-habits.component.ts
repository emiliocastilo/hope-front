import { Component } from '@angular/core';
import { constants } from '../../../../../../constants/constants';

@Component({
  selector: 'app-consumption-habits',
  templateUrl: './consumption-habits.component.html',
  styleUrls: ['./consumption-habits.component.scss'],
})
export class ConsumptionHabitsComponent {
  key = constants.KEY_CONSUMPTIONHABITS;
}
