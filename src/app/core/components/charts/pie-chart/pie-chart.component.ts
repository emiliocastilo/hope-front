import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent {
  @Input() chartTitle: string;
  @Input() results: any[];
  @Input() view: number[];
  @Input() showLegend: boolean = true;
  @Input() showLabels: boolean = true;
  @Input() legendTitle: string = '';
  @Input() doughnut: boolean = false;
  @Input() gradient: boolean = false;
  @Input() legendPosition: string = 'right';
  @Output() chartItemSelected: EventEmitter<any> = new EventEmitter<any>();

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  constructor(private _translate: TranslateService) {}

  onChartItemSelected(event: any) {
    this.chartItemSelected.emit(event);
  }
}
