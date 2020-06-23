import { Component } from '@angular/core';
import { constants } from '../../../../../../constants/constants';

@Component({
  selector: 'app-sociodemographic-data',
  templateUrl: './sociodemographic-data.component.html',
  styleUrls: ['./sociodemographic-data.component.scss'],
})
export class SociodemographicDataComponent {
  key = constants.keySocioDermographic;
}
