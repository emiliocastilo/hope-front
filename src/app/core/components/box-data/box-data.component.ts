import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-box-data',
  templateUrl: './box-data.component.html',
  styleUrls: ['./box-data.component.scss'],
})
export class BoxDataComponent implements OnInit {
  @Input() data: any = {};
  @Input() keysToShow: string[] = [];

  constructor(public _translate: TranslateService) {}

  ngOnInit(): void {}

  Parsedata(value: any): string {
    let valuetoPrint =
      typeof value === 'object' ? value.name || value.title : value;

    if (Date.parse(valuetoPrint)) {
      const date = new Date(valuetoPrint);
      valuetoPrint = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`;
    }
    return valuetoPrint;
  }
}
