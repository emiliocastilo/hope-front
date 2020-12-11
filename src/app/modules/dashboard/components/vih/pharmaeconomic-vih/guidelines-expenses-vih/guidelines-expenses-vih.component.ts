import { Component, OnInit, OnChanges } from '@angular/core';
import { ChartObjectModel } from 'src/app/core/models/graphs/chart-object.model';
import { GraphsService } from 'src/app/modules/dashboard/services/graphs.service';
import { ColumnChartModel } from 'src/app/core/models/graphs/column-chart.model';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsService } from 'src/app/core/services/forms/forms.service';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { TranslateService } from '@ngx-translate/core';
import StringUtils from 'src/app/core/utils/StringUtils';
import { curveBasis } from 'd3-shape';

@Component({
    selector: 'app-guidelines-expenses-vih',
    templateUrl: './guidelines-expenses-vih.component.html',
    styleUrls: ['./guidelines-expenses-vih.component.scss'],
})
export class GuidelinesExpensesVihComponent implements OnInit {
    options = [
        {
            name: this._translate.instant('alternativeGuidelines'),
        },
        {
            name: this._translate.instant('initialGuidelines'),
        },
    ];

    selectLabel = this._translate.instant('guideLines');
    selectedOption = this.options[0].name;
    selectedChart: string;
    selectedGuideLine: string;

    // Controles
    public form: FormGroup = new FormGroup({
        switchValue: new FormControl(),
        maxValue: new FormControl(),
    });

    // Queries gráfica y tabla
    query: string;

    public dataChart: ChartObjectModel[];
    public configChart: ColumnChartModel;
    accumulated = false;
    maxAvgAnualValue: number;

    // Paginación
    public currentPage: number = 0;
    public paginationData: PaginationModel = new PaginationModel(0, 0, 0);
    public currentSort: any = {
        column: 'nhc',
        direction: 'asc',
    };

    // ChartTitles
    public guideLines = [];

    constructor(private _graphService: GraphsService, private fb: FormBuilder, private _router: Router, private _translate: TranslateService, private _formsService: FormsService) {}

    ngOnInit(): void {
        this.loadGuideLinesFromForm();
        this.fb.group({
            switchValue: [false],
            maxValue: [],
        });
        this.loadValues(this.selectedOption);
    }

    // TODO: plopezc . de dónde saco las pautas. Las pongo una a una a mano en algún lado tipo catálogo?
    // Estoy trayendo lo único que veo relacionado, que es el form de ginecología.
    loadGuideLinesFromForm() {
        let formValues: any;
        this._formsService
            .get('gynecology')
            .then((data) => {
                formValues = Object.assign(data);
                let treatments: any;
                treatments = JSON.parse(StringUtils.replaceAllSimpleToDoubleQuotes(formValues.form));
                treatments[2].fields[5].options.forEach((option) => {
                    this.guideLines.push(option.name);
                });
                this.selectedGuideLine = this.guideLines[0];
                this.loadValues(this.selectedOption);

                return data;
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    // Selección de pauta
    onSelectGuideLine(event: any) {
        this.selectedGuideLine = event.target.value;
        this.loadValues(this.selectedOption);
    }

    // Selección acumulado
    switchAccumulated() {
        this.accumulated = !this.accumulated;
        this.loadValues(this.selectedOption);
    }

    private getExpenses(query: string): void {
        this._graphService.getCostsByGuideLine(query).subscribe(
            (data) => {
                const dataToParse = this.sortByMonth(data);
                this.dataChart = this.parseDataChart(dataToParse);

                const title = this.selectedChart;
                const view = null;
                const scheme = {
                    domain: ['#ffc107', '#2196f3', '#4caf50', '#cc0606'],
                };
                this.configChart = new ColumnChartModel(title, view, scheme, this.dataChart);
            },
            (error) => {
                console.error(error);
            }
        );
    }

    private parseDataChart(data: any): ChartObjectModel[] {
        const arrayData = Object.keys(data.ene).map((keyYear: string) => {
            // console.log(data.ene);
            const object = {
                name: keyYear,
                series: [],
            };

            Object.keys(data).forEach((keyMonth: string) => {
                const objectSerie = {
                    value: data[keyMonth][keyYear] && data[keyMonth][keyYear] !== '-' ? data[keyMonth][keyYear] : 0,
                    name: keyMonth,
                };
                object.series.push(objectSerie);
            });

            return object;
        });
        return arrayData;
    }

    // TODO - plopezc - descomentar al quitar mock
    private sortByMonth(arr: any): any {
        var months = ['ene', 'feb', 'mar' /* ,
     'abr',
      'may',
      'jun',
      'jul',
      'ago',
      'sep',
      'oct',
      'nov',
      'dic', */];
        const object = {};
        months.forEach((month: string) => {
            object[month] = arr[month];
        });

        return object;
    }

    onSelect(event: any) {
        this.selectedOption = event.target.value;
        this.loadValues(this.selectedOption);
    }

    switchOptions(event: any) {
        this.accumulated = !this.accumulated;
        this.loadValues(this.selectedOption);
    }

    loadValues(selectedOption: string) {
        let query: string;
        switch (selectedOption) {
            case this.options[0].name:
                if (!this.accumulated) {
                    query = 'type=alt';
                    this.selectedChart = this._translate.instant('costOf') + this.selectedGuideLine;
                } else {
                    query = 'type=altAccumulated';
                    this.selectedChart = this._translate.instant('accumulatedCostOf') + this.selectedGuideLine;
                }
                break;
            case this.options[1].name:
                if (!this.accumulated) {
                    query = 'type=init';
                    this.selectedChart = this._translate.instant('costOf') + this.selectedGuideLine;
                } else {
                    query = 'type=initAccumulated';
                    this.selectedChart = this._translate.instant('accumulatedCostOf') + this.selectedGuideLine;
                }
        }
        this.query = query;
        // TODO plopezc Lanzar petición desmockeada
        //this.getExpenses(query);
        this.mockData();
    }

    //TODO - plopezc -borrar cuando esté back
    public mockData() {
        //const query = `code=${this.currenMedicine.codeAct}`;
        /* this._graphService.getTotalExpenses(query).subscribe(
      (data) => { */
        setTimeout(() => {
            const data = { ene: { 'En ensayo clínico': 500, 'Controlados y estables': 100 }, feb: { 'En ensayo clínico': 200, 'Controlados y estables': 190 }, mar: { 'En ensayo clínico': 350, 'Controlados y estables': 400 } };
            const dataToParse = this.sortByMonth(data);
            this.dataChart = this.parseDataChart(dataToParse);
            const gradient = false;
            const xAxis = true;
            const yAxis = true;
            const legend = true;
            const legendTitle = '';
            const legendPosition = 'right';
            const showXAxisLabel = false;
            const showYAxisLabel = false;
            const curve: any = curveBasis;
            const title = this.selectedChart;
            const view = null;
            const scheme = {
                domain: ['#ffc107', '#2196f3', '#4caf50', '#cc0606'],
            };
            //this.configChart = new ColumnChartModel(title, view, scheme, this.dataChart);
            this.configChart = new ColumnChartModel(title, view, scheme, this.dataChart, legend, gradient, xAxis, yAxis, showXAxisLabel, showYAxisLabel, null, null, legendPosition, legendTitle, null, curve);
        });
    }
}
