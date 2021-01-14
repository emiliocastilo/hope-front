import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ChartObjectModel } from 'src/app/core/models/graphs/chart-object.model';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import TableActionsBuilder from 'src/app/core/utils/TableActionsBuilder';
import { GraphsService } from 'src/app/modules/dashboard/services/graphs.service';

@Component({
    selector: 'app-patients-vih-levels',
    templateUrl: './patients-vih-levels.component.html',
    styleUrls: ['./patients-vih-levels.component.scss'],
})
export class PatientsVihLevelsComponent implements OnInit {
    // Select, datos iniciales
    selectLabel: string;
    selectedOption = 'CVP';
    selectedChart = '';

    query: string;
    //Gráfica
    dataChart: ChartObjectModel[];
    data: ChartObjectModel[];
    options = [
        {
            name: this.translate.instant('CVP'),
        },
        {
            name: this.translate.instant('CD4'),
        },
        {
            name: this.translate.instant('riskGroup'),
        },
        {
            name: this.translate.instant('viralInfection'),
        },
        {
            name: this.translate.instant('VHC'),
        },
        {
            name: this.translate.instant('recommendedInitGuidelines'),
        },
    ];

    //Tabla
    public titleHeader: string = '';
    showingDetail = false;
    columHeaders: string[] = [this.selectedOption, 'patients'];
    dataTable: any[];
    public actions: TableActionsModel[] = new TableActionsBuilder().getDetail();

    //Detalle
    public headersDetailsTable: string[] = ['nhc', 'sip', 'patient', 'principalDiagnose', 'treatment', 'CVP', 'CD4', 'adherence'];
    public detailsDataTable: any[];
    private currentSelected: any;
    public details: any[] = [];
    public dataToExport: any[] = [];

    // Paginación
    public currentPage: number = 0;
    public paginationData: PaginationModel = new PaginationModel(0, 0, 0);
    public currentSort: any = {
        column: 'nhc',
        direction: 'asc',
    };

    constructor(private _graphService: GraphsService, public translate: TranslateService, private _router: Router) {}

    ngOnInit(): void {
        this.selectLabel = this.translate.instant('byVIHParameters');
        this.loadValues(this.selectedOption);
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
        this.selectedOption = event.target.value;
        this.loadValues(this.selectedOption);
    }

    loadValues(selectedOption: string) {
        this.columHeaders[0] = this.selectedOption;
        this.showingDetail = false;
        let query: string;
        switch (selectedOption) {
            case this.options[0].name:
                query = 'type=CVP';
                this.selectedChart = 'chartCVP';
                break;
            case this.options[1].name:
                query = 'type=CD4';
                this.selectedChart = 'chartCD4';
                break;
            case this.options[2].name:
                query = 'type=risk-factors';
                this.selectedChart = 'chartRISK';
                break;
            case this.options[3].name:
                query = 'type=VIRAL';
                this.selectedChart = 'chartVIRAL';
                break;
            case this.options[4].name:
                query = 'type=VHC';
                this.selectedChart = 'chartVHC';
                break;
        }
        this.query = query;
        this.getData(query);
    }

    private parseDataChart(data: any): ChartObjectModel[] {
        const arrayData = Object.keys(data).map((key) => {
            const object = {
                name: key,
                value: data[key],
            };
            return object;
        });

        return arrayData;
    }

    private parseDataTable(data: any): any[] {
        let arrayData = Object.keys(data).map((key, i) => {
            let object = {
                [this.selectedOption]: key,
                patients: data[key],
            };
            return object;
        });
        return arrayData;
    }

    // Detalle - El parámetro se llama indication pero no tiene que ver con las de Derma
    public onIconButtonClick(event: any): void {
        if (event.type === 'detail') {
            this.showingDetail = true;
            this.currentSelected = this.dataTable[event.selectedItem];
            const query = this.query + '&indication=' + this.currentSelected[this.selectedOption];
            this.getDetails(query);
            this.getDetailsToExport(query);
        } else {
            this.showingDetail = false;
        }
    }

    private getDetails(query: string): void {
        query = query.replace('+', '%2B');
        this._graphService.getDetailPatientsByClinicalParameter(query).subscribe(
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
                    CVP: value.cvp,
                    CD4: value.cd4,
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
