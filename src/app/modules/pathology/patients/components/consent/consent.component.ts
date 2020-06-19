import { Component } from '@angular/core';
import { constants } from '../../../../../../constants/constants';

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.scss'],
})
export class ConsentComponent {
  key = constants.KEY_CONSENT;
}
