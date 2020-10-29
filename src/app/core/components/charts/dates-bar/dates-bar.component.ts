import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-dates-bar',
  templateUrl: './dates-bar.component.html',
  styleUrls: ['./dates-bar.component.scss'],
})
export class DatesBarComponent implements OnInit {
  dates = ['2020-12-19', '2020-12-20', '2020-12-21', '2020-12-22'];
  minValue = 0;
  maxValue = this.dates.length - 1;
  options: Options = {
    floor: 0,
    ceil: this.dates.length - 1,
    translate: (value: number): string => {
      return this.dates[value];
    },
  };
  constructor() {}

  ngOnInit(): void {}
}
