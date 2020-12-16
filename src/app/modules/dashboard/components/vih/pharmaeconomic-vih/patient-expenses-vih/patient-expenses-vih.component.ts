import { Component, OnInit, OnChanges } from '@angular/core';
import { ChartObjectModel } from 'src/app/core/models/graphs/chart-object.model';
import { GraphsService } from 'src/app/modules/dashboard/services/graphs.service';
import { ColumnChartModel } from 'src/app/core/models/graphs/column-chart.model';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import TableActionsBuilder from 'src/app/core/utils/TableActionsBuilder';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { TranslateService } from '@ngx-translate/core';
import { curveBasis } from 'd3-shape';
import { Observable } from 'rxjs/internal/Observable';

@Component({
    selector: 'app-patient-expenses-vih',
    templateUrl: './patient-expenses-vih.component.html',
    styleUrls: ['./patient-expenses-vih.component.scss'],
})
export class PatientExpensesVihComponent implements OnInit {
    options = [
        {
            name: this._translate.instant('total'),
        },
        {
            name: this._translate.instant('average'),
        },
    ];

    selectLabel = this._translate.instant('costs');
    selectedOption = this.options[0].name;
    selectedChart: string;

    public form: FormGroup = new FormGroup({
        switchValue: new FormControl(),
        maxValue: new FormControl(),
    });

    // Queries gráfica y tabla
    query: string;
    tableQuery: string;

    //Tabla
    showingDetail = false;
    columHeaders: string[] = ['patientType', 'patients'];
    dataTable: any[];
    public detailsDataTable: any[];
    private currentSelected: any;
    public details: any[] = [];
    public dataToExport: any[] = [];
    public headersDetailsTable: string[] = ['nhc', 'sip', 'patient', 'principalDiagnose', 'treatment', 'CVP', 'CD4', 'adherence'];
    private months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    public actions: TableActionsModel[] = new TableActionsBuilder().getDetail();

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

    constructor(private _graphService: GraphsService, private fb: FormBuilder, private _router: Router, private _translate: TranslateService) {}

    ngOnInit(): void {
        this.fb.group({
            switchValue: [false],
            maxValue: [],
        });
        this.getTableData();
        this.getExpenses();
    }

    onSelect(event: any) {
        this.selectedOption = event.target.value;
        this.getExpenses();
    }

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
        console.log('parsedataChart', data);
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

    switchOptions(event: any) {
        this.accumulated = !this.accumulated;
        this.loadValues();
    }

    loadValues(): Observable<any> {
        return new Observable<any>((observer) => {
            switch (this.selectedOption) {
                case this.options[0].name:
                    // Total
                    if (!this.accumulated) {
                        this.selectedChart = 'totalCostByPatientType';
                        this._graphService.getCostsByPatientType().subscribe(
                            (data) => observer.next(data),
                            (error) => observer.next(error)
                        );
                        // Total acumulado
                    } else {
                        this.selectedChart = 'totalAccumulatedCostByPatientType';
                        this._graphService.getCostsByPatientTypeAccumulated().subscribe(
                            (data) => observer.next(data),
                            (error) => observer.next(error)
                        );
                    }
                    break;
                case this.options[1].name:
                    // Medio
                    if (!this.accumulated) {
                        this.selectedChart = 'avgCostByPatientType';
                        this._graphService.getAvgCostsByPatientType().subscribe(
                            (data) => observer.next(data),
                            (error) => observer.next(error)
                        );
                        // Medio acumulado
                    } else {
                        this.selectedChart = 'avgAccumulatedCostByPatientType';
                        this._graphService.getAvgCostsByPatientTypeAccumulated().subscribe(
                            (data) => observer.next(data),
                            (error) => observer.next(error)
                        );
                    }
                    break;
            }
            this.form.controls.maxValue.setValue('');
        });
    }

    private getTableData() {
        this._graphService.getPatientsByPatientType().subscribe(
            (data) => {
                this.dataTable = this.parseDataTable(data);
            },
            (error) => {
                console.error(error);
            }
        );
    }

    private parseDataTable(data: any): any[] {
        const arrayData = Object.keys(data).map((key) => {
            const object = {
                patientType: data[key],
                patients: data[key].value,
            };
            return object;
        });

        return arrayData;
    }

    // DETALLE
    public onIconButtonClick(event: any): void {
        if (event.type === 'detail') {
            this.showingDetail = true;
            this.currentSelected = this.dataTable[event.selectedItem];
            const query = 'patientType=' + this.currentSelected.patientType.name;
            this.query = query;
            this.getDetails(query);
            this.getDetailsToExport(query);
        } else {
            this.showingDetail = false;
        }
    }

    private getDetails(query: string): void {
        this._graphService.getDetailPatientsByPatientType(query).subscribe(
            (data: any) => {
                this.details = data.content;
                this.paginationData = data;
                this.detailsDataTable = this.parseDataToTableDetails(data.content);
            },
            (error) => {
                console.error(error);
            }
        );
    }

    private parseDataToTableDetails(data: any[]): any[] {
        if (data) {
            const arrayObject = data.map((value: any) => {
                const object = {
                    nhc: value.nhc,
                    sip: value.healthCard,
                    patient: value.fullName,
                    principalDiagnose: value.principalDiagnose,
                    treatment: value.treatment,
                    CVP: value.CVP,
                    CD4: value.CD4,
                    adherence: value.adherence,
                };
                return object;
            });
            return arrayObject;
        }
    }

    private getDetailsToExport(query: string) {
        this._graphService.getDetailPatientsByPatientTypeToExport(query).subscribe(
            (data: any) => {
                this.dataToExport = data;
            },
            (error) => {
                console.error(error);
            }
        );
    }

    public onPatientClick(event: any) {
        if (event.type === 'detail') {
            const currentUser = this.details[event.selectedItem];
            const selectedUser = JSON.stringify(currentUser || {});
            localStorage.setItem('selectedPatient', selectedUser);
            this._router.navigate(['pathology/patients/dashboard']);
        }
    }

    public selectPage(page: number) {
        if (this.currentPage !== page) {
            this.currentPage = page;
            const query = this.query + `&result=${this.currentSelected.patientType.name}&page=${this.currentPage}&sort=${this.currentSort.column},${this.currentSort.direction}`;
            this.getDetails(query);
        }
    }

    public onSort(event: any) {
        const query = this.query + `&result=${this.currentSelected.patientType.name}&page=${this.currentPage}&sort=${event.column},${event.direction}`;
        this.currentSort = event;
        this.getDetails(query);
    }

    filterMaxValue(maxValue: number) {
        this.maxAvgAnualValue = maxValue;

        if (this.dataChart) {
            const data = [...this.dataChart];
            this.dataChart = null;
            const currentValue = maxValue;

            const objectToAdd: ChartObjectModel = {
                name: this._translate.instant('maxAnualValue'),
                series: [],
            };

            objectToAdd.series = this.months.map((month: string) => {
                const point = {
                    name: month,
                    value: currentValue,
                };
                return point;
            });

            const lastPosition = data.length - 1;

            if (data[lastPosition].name === this._translate.instant('maxAnualValue')) {
                data.splice(-1, 1);
                data.push(objectToAdd);
            } else {
                data.push(objectToAdd);
            }
            this.dataChart = data;

            setTimeout(() => {
                const title = this.selectedChart;
                const view = null;
                const scheme = {
                    domain: ['#ffc107', '#2196f3', '#4caf50', '#cc0606'],
                };
                this.configChart = new ColumnChartModel(title, view, scheme, this.dataChart);
            }, 100);
        }
    }
}
