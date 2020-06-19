import { Component, Input, OnInit } from '@angular/core';
import { constants } from '../../../../../../../constants/constants';

@Component({
  selector: 'app-sociodemographic-data',
  templateUrl: './sociodemographic-data.component.html',
  styleUrls: ['./sociodemographic-data.component.scss'],
})
export class SociodemographicDataComponent implements OnInit {
  @Input() key = constants.KEY_SOCIODEMOGRAPHIC;
  constructor() {}

  ngOnInit(): void {}
}
