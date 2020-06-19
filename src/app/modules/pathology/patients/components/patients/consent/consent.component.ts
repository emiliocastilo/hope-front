import { Component, Input, OnInit } from '@angular/core';
import { constants } from '../../../../../../../constants/constants';

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.scss'],
})
export class ConsentComponent implements OnInit {
  @Input() key = constants.KEY_CONSENT;
  constructor() {}

  ngOnInit(): void {}
}
