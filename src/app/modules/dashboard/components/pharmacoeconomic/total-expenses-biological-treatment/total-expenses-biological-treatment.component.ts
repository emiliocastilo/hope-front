import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { ChartObjectModel } from 'src/app/core/models/graphs/chart-object.model';
import { ColumnChartModel } from 'src/app/core/models/graphs/column-chart.model';
import { MedicinesServices } from 'src/app/core/services/medicines/medicines.services';
import { NotificationService } from 'src/app/core/services/notification.service';
import { MedicineModel } from 'src/app/modules/management/models/medicines/medicines.model';
import { GraphsService } from '../../../services/graphs.service';

export interface SelectOption {
    code: string;
    name: string;
    literal: string;
    accumulated?: boolean;
}

@Component({
    selector: 'app-total-expenses-biological-treatment',
    templateUrl: './total-expenses-biological-treatment.component.html',
    styleUrls: ['./total-expenses-biological-treatment.component.scss', '../../../../../core/components/basics/entry-menu-select/entry-menu-select.component.scss'],
})
export class TotalExpensesBiologicalTreatmentComponent {
    private title: string;

    public options: Array<SelectOption> = [
        { code: 'total', name: 'total', literal: 'total-expenses' },
        { code: 'average', name: 'average', literal: 'avg-expenses' },
    ];

    public loadingData: boolean = true;
    public selectedOption: SelectOption;
    public accumulated: boolean = false;
    public config = { showToggleExpenses: true };
    public dataChart: ChartObjectModel[];
    public configChart: ColumnChartModel;
    public currenMedicine: MedicineModel;
    public medicines: Array<MedicineModel>;

    public accumulatedForm: FormGroup;
    public form: FormGroup = new FormGroup({
        selectMedicine: new FormControl(),
    });

    constructor(private _graphService: GraphsService, private _notification: NotificationService, private _medicinesService: MedicinesServices, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.getMedicines();
        this.accumulatedForm = this.fb.group({
            switchValue: [false],
        });
        this.onChanges();
    }

    private onChanges() {
        this.accumulatedForm.valueChanges.subscribe((val) => {
            this.accumulated = val.switchValue;
            this.selectedOption.accumulated = val.switchValue;
            this.loadData();
        });
    }

    private getData(): Observable<any> {
        const query = `code=${this.currenMedicine.codeAct}`;
        return new Observable<any>((observer) => {
            if (this.selectedOption.accumulated) {
                if (this.selectedOption.code === 'total') {
                    this.title = 'accumulatedCost';
                    this._graphService.getTotalAccumulatedExpenses(query).subscribe(
                        (data) => observer.next(data),
                        (error) => observer.error(error)
                    );
                } else {
                    this.title = 'accumulatedAverageCost';
                    this._graphService.getTotalAvgAccumulatedExpenses(query).subscribe(
                        (data) => observer.next(data),
                        (error) => observer.error(error)
                    );
                }
            } else {
                if (this.selectedOption.code === 'total') {
                    this.title = 'totalCost';
                    this._graphService.getTotalExpenses(query).subscribe(
                        (data) => observer.next(data),
                        (error) => observer.error(error)
                    );
                } else {
                    this.title = 'averageCost';
                    this._graphService.getTotalAvgExpenses(query).subscribe(
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
                this.dataChart = this.parseDataChart(dataToParse);
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

    private sortByMonth(arr: any): any {
        var months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
        const object = {};
        months.forEach((month: string) => {
            object[month] = arr[month];
        });

        return object;
    }

    private getMedicines(): void {
        const query = 'size=1000&groupby=actIngredients';
        this._medicinesService.getAllGrupedBy(query).subscribe(
            (data) => {
                if (!data.empty) {
                    this.medicines = data.content;
                    this.addNameToMedicine(this.medicines);
                    this.currenMedicine = this.medicines[0];
                    this.loadData();
                }
            },
            (error) => this._notification.showErrorToast(error.errorCode)
        );
    }

    private addNameToMedicine(array: any[]): void {
        array.forEach((value: any, key: number) => {
            array[key].name = array[key].actIngredients;
        });
    }

    public onFormSubmit(): void {
        this.dataChart = null;
        this.loadData();
    }

    public onSelectMedicine(event: any): void {
        this.currenMedicine = event;
        this.loadData();
    }

    public onSelectChange(index: number) {
        this.selectedOption = this.options[index];
        this.selectedOption.accumulated = this.accumulated;
        this.loadData();
    }
}
