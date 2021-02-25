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
import { Observable } from 'rxjs/internal/Observable';

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
    avgOptions = [
        {
            name: this._translate.instant('total'),
        },
        {
            name: this._translate.instant('average'),
        },
    ];

    selectLabel = this._translate.instant('guideLines');
    selectedOption = this.options[0].name;
    accumulated = false;
    selectedChart: string;
    selectedGuideLine: string;
    avgOptionSelected = this.avgOptions[0];

    // Controles
    public form: FormGroup = new FormGroup({
        switchValue: new FormControl(),
    });

    // Queries gráfica y tabla
    query: string;

    public dataChart: ChartObjectModel[];
    public configChart: ColumnChartModel;

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
        this.getGuideLines();
        this.fb.group({
            switchValue: [false],
        });
        this.avgOptionSelected = this.avgOptions[0].name;
        this.getExpenses();
    }

    // Selección tipo de pauta
    onSelect(event: any) {
        this.selectedOption = event.target.value;
        this.getGuideLines();
        this.getExpenses();
    }
    // Selección de pauta
    onSelectGuideLine(event: any) {
        this.selectedGuideLine = event.target.value;
        this.getExpenses();
    }
    // Selección medio/total
    onSelectAvg(event: any) {
        this.avgOptionSelected = event.target.value;
        this.getExpenses();
    }

    // Selección acumulado
    switchAccumulated() {
        this.accumulated = !this.accumulated;
        this.getExpenses();
    }

    private getExpenses(): void {
        this.loadValues().subscribe(
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
        if (data.ene) {
            const arrayData = Object.keys(data.ene).map((keyYear: string) => {
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
    }

    private sortByMonth(arr: any): any {
        var months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
        const object = {};
        months.forEach((month: string) => {
            object[month] = arr[month];
        });

        return object;
    }

    loadValues(): Observable<any> {
        const query = 'code=' + this.selectedGuideLine;
        return new Observable<any>((observer) => {
            if (!this.accumulated) {
                // Total no acumulado
                if (this.avgOptionSelected === this.avgOptions[0].name) {
                    this.selectedChart = this._translate.instant('costOf') + this.selectedGuideLine;
                    this._graphService.getCostsByGuideLine(query).subscribe(
                        (data) => observer.next(data),
                        (error) => observer.next(error)
                    );
                }
                // Medio no acumulado
                else {
                    this.selectedChart = this._translate.instant('avgCostOf') + this.selectedGuideLine;
                    this._graphService.getAvgCostsByGuideLine(query).subscribe(
                        (data) => observer.next(data),
                        (error) => observer.next(error)
                    );
                }
            } else {
                // Total acumulado
                if (this.avgOptionSelected === this.avgOptions[0].name) {
                    this.selectedChart = this._translate.instant('accumulatedCostOf') + this.selectedGuideLine;
                    this._graphService.getCostsByGuideLineAccumulated(query).subscribe(
                        (data) => observer.next(data),
                        (error) => observer.next(error)
                    );
                }
                // Medio acumulado
                else {
                    this.selectedChart = this._translate.instant('avgAccumulatedCostOf') + this.selectedGuideLine;
                    this._graphService.getAvgCostsByGuideLineAccumulated(query).subscribe(
                        (data) => observer.next(data),
                        (error) => observer.next(error)
                    );
                }
            }
        });
    }

    // TODO: Obtener del servicio de tratamientos cuando esté listo.
    // Obtenemos las pautas de tratamiento según el tipo de pauta alternativa/inicio
    getGuideLines(): any {
        if (!this.selectedOption) {
            this.selectedOption = this.options[0].name;
        }
        const alternativeGuideLines = ['ABC/3TC+ATV/r', 'ABC/3TC+RAL', 'TDF/FTC+ATV/r', 'TDF/FTC+DRV/r', 'TDF/FTC/EFV', 'TDF/FTC/EVG/COBI', 'TDF/FTC/RPV', 'TDF/FTC+DRV/COBI', 'TDF/FTC+ATV/COBI', 'ABC/3TC+ATV/COBI'];
        const initGuidelines = ['ABC/3TC+DRV/r', 'ABC/3TC+EFV', 'ABC/3TC+LPV/r', 'TDF/FTC+LPV/r', 'TDF/FTC+NVP', '3TC+LPV/r', 'RAL+DRV/r', 'RAL+LPV/r', 'ABC/3TC+DRV/COBI'];
        this.guideLines = this.selectedOption === this.options[0].name ? alternativeGuideLines : initGuidelines;
        this.selectedGuideLine = this.guideLines[0];
        return this.guideLines;
    }
}
