import { Component } from '@angular/core';
import { constants } from '../../../../../../constants/constants';

@Component({
  selector: 'app-biological-drug-monitoring',
  templateUrl: './biological-drug-monitoring.component.html',
  styleUrls: ['./biological-drug-monitoring.component.scss'],
})
export class BiologicalDrugMonitoringComponent {
  key = constants.keyBiologicalDrugMonitoring;
}
