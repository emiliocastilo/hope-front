import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ChartObjectModel } from 'src/app/core/models/graphs/chart-object.model';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import TableActionsBuilder from 'src/app/core/utils/TableActionsBuilder';
import { GraphsService } from 'src/app/modules/dashboard/services/graphs.service';

@Component({
    selector: 'app-patient-treatments-vih-change',
    templateUrl: './patient-treatments-vih-change.component.html',
    styleUrls: ['./patient-treatments-vih-change.component.scss'],
})
export class PatientTreatmentsVihChangeComponent implements OnInit {
    //Gráfica
    dataChart: ChartObjectModel[];

    // Select, datos iniciales
    options = [
        {
            name: 'Motivo de cambio',
        },
        {
            name: 'Fallo Viral',
        },
        {
            name: 'RAMs', // (Reacciones adversas a medicamentos)
        },
        {
            name: 'Número de cambios por tratamiento',
        },
    ];
    selectLabel: string;
    selectedOption = this.options[0].name;
    selectedChart = '';
    query: string;

    //Tabla
    showingDetail = false;
    columHeaders: string[] = ['changeCause', 'patients'];
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
        this.selectLabel = this.translate.instant('treatmentChange');
        this.loadValues(this.selectedOption);
    }

    private getData(query: string): void {
        this._graphService.getPatientsByTreatmentChange(query).subscribe(
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
        let query: string;
        switch (selectedOption) {
            case this.options[0].name:
                query = 'type=cause';
                this.selectedChart = 'changeCause';
                break;
            case this.options[1].name:
                query = 'type=failure';
                this.selectedChart = 'chartFailure';
                break;
            case this.options[2].name:
                query = 'type=RAMS';
                this.selectedChart = 'chartRAMS';
                break;
            case this.options[3].name:
                query = 'type=changequantity';
                this.selectedChart = 'chartChangeQuantity';
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
        const arrayData = Object.keys(data).map((key) => {
            const object = {
                changeCause: key,
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
            const query = this.query + '&reason=' + this.currentSelected.changeCause;

            this.getDetails(query);
            this.getDetailsToExport(query);
        } else {
            this.showingDetail = false;
        }
    }

    private getDetails(query: string): void {
        this._graphService.getDetailPatientsByTreatmentChange(query).subscribe(
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
        this._graphService.getDetailPatientsByTreatmentChangeToExport(query).subscribe(
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
            const query = this.query + `&result=${this.currentSelected.changeCause}&page=${this.currentPage}&sort=${this.currentSort.column},${this.currentSort.direction}`;
            this.getDetails(query);
        }
    }

    public onSort(event: any) {
        const query = this.query + `&result=${this.currentSelected.changeCause}&page=${this.currentPage}&sort=${event.column},${event.direction}`;
        this.currentSort = event;
        this.getDetails(query);
    }

    // Control de interacción con la gráfica
    public handleChartItemSelect(chartItemSelected: any) {
        // Solo cuando estamos sobre la primera opción del select
        if (this.selectedOption == this.options[0].name) {
            // Control de selección de leyenda/quesito
            chartItemSelected = typeof chartItemSelected == 'string' ? chartItemSelected : chartItemSelected.name;
            let charts = document.getElementById('chartSelector');
            this.options.forEach((option, i) => {
                if (chartItemSelected === option.name) {
                    charts[i].selected = true;
                    this.selectedOption = option.name;
                    this.loadValues(this.selectedOption);
                }
            });
        }
    }
}
