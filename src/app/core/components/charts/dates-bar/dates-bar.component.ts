import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-dates-bar',
  templateUrl: './dates-bar.component.html',
  styleUrls: ['./dates-bar.component.scss'],
})
export class DatesBarComponent implements OnInit {
  @Input() dates: Array<string>;
  minValue: number;
  maxValue: number;
  options: Options;
  @Output() indexes: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {
    if (this.dates && this.dates.length > 0) {
      this.minValue = 0;
      this.maxValue = this.dates.length - 1;
      this.options = {
        floor: 0,
        ceil: this.dates.length - 1,
        translate: (value: number): string => {
          return this.dates[value];
        },
      };
    }
  }

  onMinValueChange() {
    this.indexes.emit({ min: this.minValue, max: this.maxValue });
  }

  onMaxValueChange() {
    this.indexes.emit({ min: this.minValue, max: this.maxValue });
  }
}
