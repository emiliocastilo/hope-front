import { Component, Input, OnInit } from '@angular/core';
import { constants } from '../../../../../../../constants/constants';

@Component({
  selector: 'app-tracing',
  templateUrl: './tracing.component.html',
  styleUrls: ['./tracing.component.scss'],
})
export class TracingComponent implements OnInit {
  @Input() key = constants.KEY_TRACING;
  constructor() {}

  ngOnInit(): void {}
}
