import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent {
  @Input() results: any[];
  @Input() view: number[] = [500, 500];
  @Input() showLegend: boolean = true;
  @Input() showLabels: boolean = true;
  @Input() legendTitle: string = '';
  @Input() doughnut: boolean = false;
  @Input() gradient: boolean = false;
  @Input() legendPosition: string = 'right';

  @Output() select: EventEmitter<any> = new EventEmitter();

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  constructor() {}

  onSelect(data: any): void {
    this.select.emit(data);
  }
}
