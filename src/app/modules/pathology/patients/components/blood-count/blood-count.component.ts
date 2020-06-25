import { Component } from '@angular/core';
import { constants } from '../../../../../../constants/constants';

@Component({
  selector: 'app-blood-count',
  templateUrl: './blood-count.component.html',
  styleUrls: ['./blood-count.component.scss'],
})
export class BloodCountComponent {
  key = constants.keyBloodCount;
}
