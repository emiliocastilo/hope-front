import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-grouped-lines-chart',
    templateUrl: './grouped-lines-chart.component.html',
    styleUrls: ['./grouped-lines-chart.component.scss']
})
export class GroupedLinesChartComponent implements OnInit {
    data: any[];
    view: any[] = [700, 400];

    // options
    showXAxis: boolean = true;
    showYAxis: boolean = true;
    gradient: boolean = true;
    showLegend: boolean = true;
    showXAxisLabel: boolean = true;
    xAxisLabel: string = 'Country';
    showYAxisLabel: boolean = true;
    yAxisLabel: string = 'Population';
    legendTitle: string = 'Years';

    colorScheme = {
        domain: ['#5AA454', '#C7B42C', '#AAAAAA']
    };

    constructor() { }

    ngOnInit () {
        this.data = [
            {
                "name": "Germany",
                "series": [
                    {
                        "name": "2010",
                        "value": 7300000
                    },
                    {
                        "name": "2011",
                        "value": 8940000
                    }
                ]
            },

            {
                "name": "USA",
                "series": [
                    {
                        "name": "2010",
                        "value": 7870000
                    },
                    {
                        "name": "2011",
                        "value": 8270000
                    }
                ]
            },

            {
                "name": "France",
                "series": [
                    {
                        "name": "2010",
                        "value": 5000002
                    },
                    {
                        "name": "2011",
                        "value": 5800000
                    }
                ]
            }
        ];
    }

    onSelect (data): void {
        console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    }

    onActivate (data): void {
        console.log('Activate', JSON.parse(JSON.stringify(data)));
    }

    onDeactivate (data): void {
        console.log('Deactivate', JSON.parse(JSON.stringify(data)));
    }

}
