import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ChartObjectModel } from 'src/app/core/models/graphs/chart-object.model';
import { ColumnChartModel } from 'src/app/core/models/graphs/column-chart.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { GraphsService } from 'src/app/modules/dashboard/services/graphs.service';

export interface SelectOption {
    code: string;
    name: string;
    literal: string;
    accumulated?: boolean;
}

@Component({
    selector: 'app-consumption-biological-treatment',
    templateUrl: './consumption-biological-treatment.component.html',
    styleUrls: ['./consumption-biological-treatment.component.scss', '../../../../../../../core/components/basics/entry-menu-select/entry-menu-select.component.scss'],
})
export class ConsumptionBiologicalTreatmentComponent implements OnInit {
    private yearlyGoalValue: number = 2;
    private title: string;

    public options: Array<SelectOption> = [
        { code: 'average', name: 'average', literal: 'avg-mon-con-eu' },
        { code: 'annual', name: 'annual', literal: 'monthly-consuption-euros' },
    ];

    public loadingData: boolean = true;
    public selectedOption: SelectOption;
    public accumulated: boolean = false;
    public config = { showToggle: true };
    public form: FormGroup;
    public dataChart: ChartObjectModel[];
    public dataTable: any[];
    public columHeaders: string[] = [
        'months',
        this._translate.instant('jan'),
        this._translate.instant('feb'),
        this._translate.instant('mar'),
        this._translate.instant('apr'),
        this._translate.instant('may'),
        this._translate.instant('jun'),
        this._translate.instant('jul'),
        this._translate.instant('aug'),
        this._translate.instant('sep'),
        this._translate.instant('oct'),
        this._translate.instant('nov'),
        this._translate.instant('dec'),
    ];
    public dataToExport: any[] = [];
    public configChart: ColumnChartModel;
    public formYearlyGoal: FormGroup = new FormGroup({
        yearlyGoalValue: new FormControl(),
    });

    constructor(private _graphService: GraphsService, private _notification: NotificationService, private _translate: TranslateService, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            switchValue: [false],
        });
        this.onChanges();
        this.loadData();
    }

    private onChanges() {
        this.form.valueChanges.subscribe((val) => {
            this.accumulated = val.switchValue;
            this.selectedOption.accumulated = val.switchValue;
            this.loadData();
        });
    }

    private getData(): Observable<any> {
        const query: string = `lastYears=${this.yearlyGoalValue}`;
        return new Observable<any>((observer) => {
            if (this.selectedOption.accumulated) {
                if (this.selectedOption.code === 'annual') {
                    // * ANUAL NO ACUMULADO
                    this.title = 'monthlyAccumulatedConsuptionEuros';
                    this._graphService.getMonthlyConsuptionEurosAccumulated().subscribe(
                        (data) => observer.next(data),
                        (error) => observer.error(error)
                    );
                } else {
                    // * MEDIO NO ACUMULADO
                    this.title = 'monthlyAccumulatedAvgConsuptionEuros';
                    this._graphService.getMonthlyConsuptionEurosAvgAccumulated(query).subscribe(
                        (data) => observer.next(data),
                        (error) => observer.error(error)
                    );
                }
            } else {
                if (this.selectedOption.code === 'annual') {
                    // * ANUAL ACUMULADO
                    this.title = 'monthlyConsuptionEuros';
                    this._graphService.getMonthlyConsuptionEuros().subscribe(
                        (data) => observer.next(data),
                        (error) => observer.error(error)
                    );
                } else {
                    // * MEDIO ACUMULADO
                    this.title = 'monthlyConsuptionEurosAvg';
                    this._graphService.getMonthlyConsuptionEurosAvg(query).subscribe(
                        (data) => observer.next(data),
                        (error) => observer.error(error)
                    );
                }
            }
        });
    }

    private loadData(): void {
        this.loadingData = true;
        if (!this.selectedOption) this.selectedOption = this.options[0];
        this.getData().subscribe(
            (data) => {
                this.loadingData = false;
                const dataToParse = this.sortByMonth(data);
                this.dataTable = this.parseDataTable(dataToParse);
                this.dataChart = this.parseDataChart(dataToParse);
                const title = 'monthlyConsuptionEurosAvg';
                const view = null;
                const scheme = {
                    domain: ['#ffc107', '#2196f3', '#4caf50', '#cc0606'],
                };
                this.configChart = new ColumnChartModel(this.title, view, scheme, this.dataChart);
            },
            (error) => this._notification.showErrorToast(error.errorCode)
        );
    }

    private parseDataChart(data: any): ChartObjectModel[] {
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

    private parseDataTable(data: any): any[] {
        const arrayData = Object.keys(data.ene).map((key: string) => {
            const object = {
                months: key,
            };
            Object.keys(data).forEach((keyMonth: string) => {
                const monthName = `${keyMonth.charAt(0).toUpperCase()}${keyMonth.slice(1)}`;
                object[monthName] = data[keyMonth][key];
            });
            return object;
        });
        return arrayData;
    }

    private sortByMonth(arr: any): any {
        var months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
        const object = {};
        months.forEach((month: string) => {
            object[month] = arr[month];
        });

        return object;
    }

    public onSelectChange(index: number) {
        this.selectedOption = this.options[index];
        this.selectedOption.accumulated = this.accumulated;
        this.loadData();
    }

    public onFormSubmit(): void {
        this.dataChart = null;
        this.yearlyGoalValue = this.formYearlyGoal.controls.yearlyGoalValue.value;
        this.loadData();
    }
}
