import { Component } from '@angular/core';
import { constants } from '../../../../../../constants/constants';

@Component({
  selector: 'app-tracing',
  templateUrl: './tracing.component.html',
  styleUrls: ['./tracing.component.scss'],
})
export class TracingComponent {
  key = constants.KEY_TRACING;
}
