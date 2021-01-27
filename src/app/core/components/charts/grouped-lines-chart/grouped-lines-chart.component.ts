import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GroupedLineChartGroupData } from 'src/app/core/models/graphs/grouped-line-chart.model';

@Component({
    selector: 'app-grouped-lines-chart',
    templateUrl: './grouped-lines-chart.component.html',
    styleUrls: ['./grouped-lines-chart.component.scss'],
})
export class GroupedLinesChartComponent implements OnInit {
    @Input() data: Array<GroupedLineChartGroupData>;
    @Input() xAxisLabel: string = '';
    @Input() yAxisLabel: string = '';
    @Input() legendTitle: string = '';
    @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

    view: any[] = [window.innerWidth - 320, 400];

    showXAxis: boolean = true;
    showYAxis: boolean = true;
    gradient: boolean = true;
    showLegend: boolean = true;
    showXAxisLabel: boolean = true;
    showYAxisLabel: boolean = true;

    colorScheme = {
        domain: ['#4185f4', '#df5a4f', '#f3af00', '#00964b', '#ab47bc', '#00abc0', '#ff6939', '#9e9d23', '#5666be', '#ef588b', '#00786a', '#c2185b'],
    };

    constructor() {}

    ngOnInit() {}

    onSelect(event: any): void {
        this.onClick.emit(event);
    }

    onActivate(data): void {
        // console.log('Activate', JSON.parse(JSON.stringify(data)));
    }

    onDeactivate(data): void {
        // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
    }
}
