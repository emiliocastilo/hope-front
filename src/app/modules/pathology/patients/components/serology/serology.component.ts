import { Component } from '@angular/core';
import { constants } from '../../../../../../constants/constants';

@Component({
  selector: 'app-serology',
  templateUrl: './serology.component.html',
  styleUrls: ['./serology.component.scss'],
})
export class SerologyComponent {
  key = constants.keySerology;
}
