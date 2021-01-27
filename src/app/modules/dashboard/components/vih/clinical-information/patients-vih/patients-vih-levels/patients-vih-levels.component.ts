import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ChartObjectModel } from 'src/app/core/models/graphs/chart-object.model';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import { NotificationService } from 'src/app/core/services/notification.service';
import TableActionsBuilder from 'src/app/core/utils/TableActionsBuilder';
import { GraphsService } from 'src/app/modules/dashboard/services/graphs.service';

export interface SelectOption {
    name: string;
    param: string;
    chart: {
        name: string;
        type: 'pie' | 'grouped-vertical-line';
    };
}

export interface GroupedBarChartItem {
    treatmentLine: string;
    activeActs: number;
    patients: number;
}

@Component({
    selector: 'app-patients-vih-levels',
    templateUrl: './patients-vih-levels.component.html',
    styleUrls: ['./patients-vih-levels.component.scss'],
})
export class PatientsVihLevelsComponent implements OnInit {
    private query: string;

    public selectLabel: string = 'byVIHParameters';
    public options: Array<SelectOption> = [
        {
            name: this.translate.instant('CVP'),
            param: 'CVP',
            chart: { name: 'chartCVP', type: 'pie' },
        },
        {
            name: this.translate.instant('CD4'),
            param: 'CD4',
            chart: { name: 'chartCD4', type: 'pie' },
        },
        {
            name: this.translate.instant('riskGroup'),
            param: 'RISK',
            chart: { name: 'chartRISK', type: 'pie' },
        },
        {
            name: this.translate.instant('viralInfection'),
            param: 'VIRAL',
            chart: { name: 'chartVIRAL', type: 'pie' },
        },
        {
            name: this.translate.instant('VHC'),
            param: 'VHC',
            chart: { name: 'chartVHC', type: 'pie' },
        },
        {
            name: this.translate.instant('recommendedInitGuidelines'),
            param: 'treatment-line',
            chart: { name: 'chartTreatmentLine', type: 'grouped-vertical-line' },
        },
    ];
    public selectedOption: SelectOption = this.options[0];

    //Gráfica
    private data: ChartObjectModel[];
    public dataChart: ChartObjectModel[];

    //Tabla
    public titleHeader: string = '';
    showingDetail = false;
    columHeaders: string[] = [this.selectedOption.name, 'patients'];
    dataTable: any[];
    public actions: TableActionsModel[] = new TableActionsBuilder().getDetail();

    //Detalle
    private currentSelected: any;
    public headersDetailsTable: string[] = ['nhc', 'sip', 'patient', 'principalDiagnose', 'treatment', 'CVP', 'CD4', 'adherence'];
    public detailsDataTable: any[];
    public details: any[] = [];
    public dataToExport: any[] = [];

    // Paginacióny en
    public currentPage: number = 0;
    public paginationData: PaginationModel = new PaginationModel(0, 0, 0);
    public currentSort: any = {
        column: 'nhc',
        direction: 'asc',
    };

    constructor(private _graphService: GraphsService, public translate: TranslateService, private _router: Router, private _notificationService: NotificationService) {}

    ngOnInit(): void {
        this.getData(`type=${this.selectedOption.param}`);
    }

    private getData(query: string): void {
        this._graphService.getPatientsByClinicalParameter(query).subscribe(
            (data) => {
                this.dataChart = this.parseDataChart(data);
                this.dataTable = this.parseDataTable(data);
            },
            (error) => {
                console.error(error);
                this._notificationService.showErrorToast('errorRetrievingData');
                // ! MOCKED DATA TEST ! //
                const data = [
                    { treatmentLine: 'Monoterapia', activeActs: 1, patients: 16 },
                    { treatmentLine: 'Combo (2)', activeActs: 2, patients: 1 },
                    { treatmentLine: 'Combo triple (3)', activeActs: 3, patients: 165 },
                    { treatmentLine: 'Combo cuádruple (4)', activeActs: 4, patients: 7 },
                    { treatmentLine: 'Individual (1+1)', activeActs: 2, patients: 50 },
                    { treatmentLine: 'Individual (1+1+1)', activeActs: 3, patients: 23 },
                    { treatmentLine: 'Combo doble (2+1)', activeActs: 3, patients: 178 },
                    { treatmentLine: 'Individual (1+1+1+1)', activeActs: 4, patients: 4 },
                    { treatmentLine: 'Combo doble (2+1+1)', activeActs: 4, patients: 9 },
                    { treatmentLine: '2 combos dobles (2+2)', activeActs: 4, patients: 0 },
                    { treatmentLine: 'Combo triple (3+1)', activeActs: 4, patients: 5 },
                    { treatmentLine: '5+ principios activos', activeActs: 5, patients: 16 },
                ];
                this.dataChart = this.parseDataChart(data);
                this.dataTable = this.parseDataTable(data);
                // ! MOCKED DATA TEST ! //
            }
        );
    }

    onSelect(event: any) {
        this.selectedOption = this.options.filter((f) => f.name === event.target.value)[0];
        this.getData(`type=${this.selectedOption.param}`);
    }

    private parseDataChart(data: any): ChartObjectModel[] {
        if (this.selectedOption.chart.type === 'pie') {
            const arrayData = Object.keys(data).map((key) => {
                const object = {
                    name: key,
                    value: data[key],
                };
                return object;
            });
            return arrayData;
        } else if (this.selectedOption.chart.type === 'grouped-vertical-line') {
            const chartData: ChartObjectModel[] = this.parseGroupedChartData(data);
            return chartData;
        } else return undefined;
    }

    private parseGroupedChartData(data: Array<GroupedBarChartItem>): ChartObjectModel[] {
        const chartData = [
            { name: 'Monoterapia', series: [] },
            { name: 'Biterapia', series: [] },
            { name: 'Terapia triple', series: [] },
            { name: 'Terapia cuádruple', series: [] },
            { name: '5+ principios activos', series: [] },
        ];

        data.forEach((item) => {
            if (item.patients > 0)
                switch (item.activeActs) {
                    case 1:
                        chartData.filter((f) => f.name === 'Monoterapia')[0].series.push({ name: item.treatmentLine, value: item.patients });
                        break;
                    case 2:
                        chartData.filter((f) => f.name === 'Biterapia')[0].series.push({ name: item.treatmentLine, value: item.patients });
                        break;
                    case 3:
                        chartData.filter((f) => f.name === 'Terapia triple')[0].series.push({ name: item.treatmentLine, value: item.patients });
                        break;
                    case 4:
                        chartData.filter((f) => f.name === 'Terapia cuádruple')[0].series.push({ name: item.treatmentLine, value: item.patients });
                        break;
                    default:
                        chartData.filter((f) => f.name === '5+ principios activos')[0].series.push({ name: item.treatmentLine, value: item.patients });
                        break;
                }
        });

        return chartData;
    }

    private parseDataTable(data: any): any[] {
        let arrayData = [];
        if (this.selectedOption.chart.type === 'grouped-vertical-line') {
            this.columHeaders = ['treatmentLine', 'patients'];
            data.forEach((item: GroupedBarChartItem) => {
                arrayData.push({ treatmentLine: item.treatmentLine, patients: item.patients });
            });
        } else {
            arrayData = Object.keys(data).map((key) => {
                const object = {
                    indication: key,
                    patients: data[key],
                };
                return object;
            });
        }

        return arrayData;
    }

    // Detalle - El parámetro se llama indication pero no tiene que ver con las de Derma
    public onIconButtonClick(event: any): void {
        if (event.type === 'detail') {
            this.showingDetail = true;
            this.currentSelected = this.dataTable[event.selectedItem];
            const query = this.query + '&indication=' + this.currentSelected[this.selectedOption.name];
            this.getDetails(query);
            this.getDetailsToExport(query);
        } else {
            this.showingDetail = false;
        }
    }

    private getDetails(query: string): void {
        this._graphService.getDetailPatientsByClinicalParameter(query).subscribe(
            (data: any) => {
                this.details = data.content;
                this.paginationData = data;
                this.detailsDataTable = this.parseDataToTableDetails(data.content);
            },
            (error) => {
                this._notificationService.showErrorToast('errorRetrievingData');
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
        this._graphService.getDetailPatientsByClinicalParameterToExport(query).subscribe(
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
            const query = this.query + `&result=${this.currentSelected.indication}&page=${this.currentPage}&sort=${this.currentSort.column},${this.currentSort.direction}`;
            this.getDetails(query);
        }
    }

    public onSort(event: any) {
        const query = this.query + `&result=${this.currentSelected.indication}&page=${this.currentPage}&sort=${event.column},${event.direction}`;
        this.currentSort = event;
        this.getDetails(query);
    }
}
