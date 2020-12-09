import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/internal/Observable';
import { ChartObjectModel } from 'src/app/core/models/graphs/chart-object.model';
import { ColumnChartModel } from 'src/app/core/models/graphs/column-chart.model';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import TableActionBuilder from 'src/app/core/utils/TableActionsBuilder';
import { PatientsTreatmentsService } from 'src/app/modules/management/services/patients-treatments/patients-treatments.service';

export interface Indication {
    id: number;
    name: string;
}

@Component({
    selector: 'app-treatments-patients',
    templateUrl: './treatments-patients.component.html',
    styleUrls: ['./treatments-patients.component.scss'],
})
export class TreatmentsPatientsComponent implements OnInit {
    private data: ChartObjectModel[];
    private currentPage: number = 0;
    private currentSelected: any;
    private type: string;
    // private indication: string;

    // entries = [
    //     {
    //         name: 'psoriasisPlacas',
    //         url: 'dashboard/treatments/treatments-patients/psoriasis-placas',
    //     },
    //     {
    //         name: 'psoriasisPalmoplantar',
    //         url: 'dashboard/treatments/treatments-patients/psoriasis-palmo-plantar',
    //     },
    //     {
    //         name: '',
    //         url: 'dashboard/treatments/treatments-patients/eritrodermia',
    //     },
    //     {
    //         name: 'psoriasisPustulosa',
    //         url: 'dashboard/treatments/treatments-patients/psoriasis-pustulosa',
    //     },
    // ];

    public config = { defaultConfig: true };
    public entries: Array<Indication> = [
        { id: 0, name: 'psoriasisPlacas' },
        { id: 1, name: 'psoriasisPalmoplantar' },
        { id: 2, name: 'eritrodermia' },
        { id: 3, name: 'psoriasisPustulosa' }
    ];
    public indication: Indication;
    public showingDetail = false;
    public dataChart: ColumnChartModel;
    public dataTable: any[];
    public actions: TableActionsModel[] = new TableActionBuilder().getDetail();
    public columHeaders: string[] = ['typeTreatmentBiological', 'patients'];
    public headersDetailsTable: string[] = ['nhc', 'sip', 'patient', 'principalIndication', 'principalDiagnose', 'treatment', 'pasi', 'pasiDate', 'dlqi', 'dlqiDate'];
    public detailsDataTable: any[];
    public paginationData: PaginationModel = new PaginationModel(0, 0, 0);
    public currentSort: any = { column: 'nhc', direction: 'asc' };
    public details: any[] = [];
    public dataToExport: any[] = [];

    constructor(
        public _activatedRoute: ActivatedRoute,
        public _patientsTreatmentsService: PatientsTreatmentsService,
        private _router: Router,
        private _translate: TranslateService) { }

    ngOnInit (): void {
        this.getData();
    }

    private getData (): void {
        const view = null;
        const scheme = { domain: ['#249cf1'] };

        if (!this.indication) this.indication = this.entries[0];
        const type = 'BIOLOGICO';
        let chartTitle = '';
        let indication = '';

        console.log(this.indication);

        switch (this.indication.id) {
            case 0:
                // * psoriasisPlacas
                chartTitle = 'patientsTreatmentPsoriasisPlacas';
                indication = 'EN PLACAS';
                break;
            case 1:
                // * psoriasisPalmoplantar
                chartTitle = 'patientsTreatmentPsoriasisPalmoPlantar';
                indication = 'PALMOPLANTAR';
                break;
            case 2:
                // * eritrodermia
                chartTitle = 'patientsTreatmentEritrodermia';
                indication = 'ERITRODERMIA';
                break;
            case 3:
                // * psoriasisPustulosa
                chartTitle = 'patientsTreatmentPsoriasisPustulosa';
                indication = 'PUSTULOSA';
                break;
            default:
                break;
        }

        this._patientsTreatmentsService.getPatientsTreatmentFindPatients(type, indication).subscribe(
            data => {
                console.log(type, indication, data);
                this.data = this.parseDataChart(data);
                this.dataChart = new ColumnChartModel(chartTitle, view, scheme, this.data);
                this.dataTable = this.parseDataTable(data);
            }
        );

    }

    private parseDataChart (data: any): ChartObjectModel[] {
        const arrayData: ChartObjectModel[] = Object.keys(data).map((key) => {
            const object: ChartObjectModel = {
                name: key,
                series: [
                    {
                        name: this._translate.instant('patients').toUpperCase(),
                        value: data[key],
                    },
                ],
            };
            return object;
        });

        return arrayData;
    }

    private parseDataTable (data: any[]) {
        const arrayData = Object.keys(data).map((key: any) => {
            const object = {
                typeTreatmentBiological: key,
                patients: data[key],
            };
            return object;
        });
        return arrayData;
    }

    private parseDataToTableDetails (data: any[]): any[] {
        const arrayObject = data.map((value: any) => {
            const object = {
                nhc: value.nhc,
                sip: value.healthCard,
                patient: value.fullName,
                principalIndication: value.principalIndication,
                principalDiagnose: value.principalDiagnose,
                treatment: value.treatment,
                pasi: value.pasi,
                pasiDate: value.pasiDate,
                dlqi: value.dlqi,
                dlqiDate: value.dlqiDate,
            };
            return object;
        });
        return arrayObject;
    }

    onIndicationChange (event): void {
        this.indication = this.entries.filter(f => f.id == event.target.value)[0];
        this.getData();
    }

    public onIconButtonClick (event: any) {
        if (event && event.type === 'detail') {
            this.showingDetail = true;
            this.currentSelected = this.data[event.selectedItem];
            const query = 'type=' + this.type + '&indication=' + this.indication + '&medicine=' + this.currentSelected.name;

            this.getDetails(query);
            this.getDetailsToExport(query);
        } else {
            this.showingDetail = false;
        }
    }

    private getDetails (query: string) {
        this._patientsTreatmentsService.getDetailPatientsUnderTreatment(query).subscribe(
            (data) => {
                this.details = data.content;
                this.paginationData = data;
                this.detailsDataTable = this.parseDataToTableDetails(data.content);
            },
            (error) => {
                console.error('error: ', error);
            }
        );
    }

    private getDetailsToExport (query: string) {
        this._patientsTreatmentsService.getDetailPatientsUnderTreatmentExport(query).subscribe(
            (data: any) => {
                this.dataToExport = data;
            },
            (error) => {
                console.error(error);
            }
        );
    }

    public onPatientClick (event: any) {
        if (event.type === 'detail') {
            const currentUser = this.details[event.selectedItem];
            const selectedUser = JSON.stringify(currentUser || {});
            localStorage.setItem('selectedPatient', selectedUser);
            this._router.navigate(['pathology/patients/dashboard']);
        }
    }

    public selectPage (page: number) {
        if (this.currentPage !== page) {
            this.currentPage = page;
            const query = `type=${this.type}&indication=${this.indication}&medicine=${this.currentSelected.name}&page=${this.currentPage}&sort=${this.currentSort.column},${this.currentSort.direction}`;
            this.getDetails(query);
        }
    }

    public onSort (event: any) {
        const query = `type=${this.type}&indication=${this.indication}&medicine=${this.currentSelected.name}&page=${this.currentPage}&sort=${event.column},${event.direction}`;
        this.currentSort = event;
        this.getDetails(query);
    }
}
