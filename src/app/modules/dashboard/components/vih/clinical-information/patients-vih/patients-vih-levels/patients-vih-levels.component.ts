import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ChartObjectModel } from 'src/app/core/models/graphs/chart-object.model';
import { GroupedLineChartGroupData } from 'src/app/core/models/graphs/grouped-line-chart.model';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
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
            name: 'CVP',
            param: 'CVP',
            chart: { name: 'chartCVP', type: 'pie' },
        },
        {
            name: 'CD4',
            param: 'CD4',
            chart: { name: 'chartCD4', type: 'pie' },
        },
        {
            name: 'Grupo de riesgo',
            param: 'RISK',
            chart: { name: 'chartRISK', type: 'pie' },
        },
        {
            name: 'Infección viral',
            param: 'VIRAL',
            chart: { name: 'chartVIRAL', type: 'pie' },
        },
        {
            name: 'VHC',
            param: 'VHC',
            chart: { name: 'chartVHC', type: 'pie' },
        },
        {
            name: 'Línea de tratamiento',
            param: 'treatment-line',
            chart: { name: 'chartTreatmentLine', type: 'grouped-vertical-line' },
        },
    ];
    public selectedOption: SelectOption = this.options[0];

    //Gráfica
    private data: ChartObjectModel[];
    public dataChart: ChartObjectModel[];

    //Tabla
    public showingDetail = false;
    public columHeaders: string[] = ['indication', 'patients'];
    public dataTable: any[];
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

    constructor(private _graphService: GraphsService, public translate: TranslateService, private _router: Router) {}

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
            // TODO : Mapear datos para gráfica de líneas agrupadas
            const chartData: Array<GroupedLineChartGroupData> = [];
            console.log(data);
            return chartData;
        } else return undefined;
    }

    private parseDataTable(data: any): any[] {
        const arrayData = Object.keys(data).map((key) => {
            const object = {
                indication: key,
                patients: data[key],
            };
            return object;
        });

        return arrayData;
    }

    // Detalle
    public onIconButtonClick(event: any): void {
        if (event.type === 'detail') {
            this.showingDetail = true;
            this.currentSelected = this.dataTable[event.selectedItem];
            const query = this.query + '&indication=' + this.currentSelected.indication;

            this.getDetails(query);
            this.getDetailsToExport(query);
        } else {
            this.showingDetail = false;
        }
    }

    private getDetails(query: string): void {
        this._graphService.getDetailPatientsByClinicalParameter(query).subscribe(
            (data: any) => {
                console.log(data);
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
