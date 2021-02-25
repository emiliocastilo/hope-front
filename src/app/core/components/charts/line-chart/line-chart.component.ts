import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ColumnChartModel } from 'src/app/core/models/graphs/column-chart.model';
import * as shape from 'd3-shape';

@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
    @Input() config: ColumnChartModel;
    @Input() stacked = false;
    @Input() firstDate = '';
    @Input() lastDate = '';
    @Output() select: EventEmitter<any> = new EventEmitter<any>();

    private defaultValues = {
        gradient: false,
        xAxis: true,
        yAxis: true,
        legend: true,
        legendTitle: '',
        legendPosition: 'right',
        showXAxisLabel: false,
        showYAxisLabel: false,
        curve: shape.curveBasis,
    };

    constructor() { }

    ngOnInit (): void {
        Object.keys(this.defaultValues).forEach((key: string) => {
            this.config[key] = this.config[key] !== undefined ? this.config[key] : this.defaultValues[key];
        });
    }

    public onSelect (value: any) {
        this.select.emit(value);
    }

    public formatDate (date: string | Date): string | Date {
        let formatedDate = date;

        if (date && Object.prototype.toString.call(date) === '[object Date]') {
            formatedDate = new Date(date).toLocaleDateString('es-Es');
        }
        return formatedDate;
    }
}
