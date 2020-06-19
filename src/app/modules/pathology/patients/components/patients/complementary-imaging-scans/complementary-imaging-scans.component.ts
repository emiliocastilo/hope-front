import { Component, Input, OnInit } from '@angular/core';
import { constants } from '../../../../../../../constants/constants';

@Component({
  selector: 'app-complementary-imaging-scans',
  templateUrl: './complementary-imaging-scans.component.html',
  styleUrls: ['./complementary-imaging-scans.component.scss'],
})
export class ComplementaryImagingScansComponent implements OnInit {
  @Input() key = constants.KEY_COMPLEMENTARYIMAGINGGSCANS;
  constructor() {}

  ngOnInit(): void {}
}
