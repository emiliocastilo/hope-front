import { Component } from '@angular/core';
import { constants } from '../../../../../../constants/constants';

@Component({
  selector: 'app-family-history',
  templateUrl: './family-history.component.html',
  styleUrls: ['./family-history.component.scss'],
})
export class FamilyHistoryComponent {
  key = constants.keyFamilyHistory;
}
