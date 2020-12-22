import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ChartObjectModel } from 'src/app/core/models/graphs/chart-object.model';
import { ColumnChartModel } from 'src/app/core/models/graphs/column-chart.model';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import TableActionBuilder from 'src/app/core/utils/TableActionsBuilder';
import { IndicationModel } from 'src/app/modules/management/models/indication/indication.model';
import { IndicationService } from 'src/app/modules/management/services/indications/indication.service';
import { PatientsTreatmentsService } from 'src/app/modules/management/services/patients-treatments/patients-treatments.service';

export interface Indication {
    code: string;
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

    public loadingData: boolean = true;
    public config = { defaultConfig: true };
    public entries: Array<IndicationModel>;
    //  = [
    //     { code: 'EN PLACAS', name: 'psoriasisPlacas' },
    //     { code: 'PALMOPLANTAR', name: 'psoriasisPalmoplantar' },
    //     { code: 'ERITRODERMIA', name: 'eritrodermia' },
    //     { code: 'PUSTULOSA', name: 'psoriasisPustulosa' },
    //     { code: 'ARTRITIS', name: 'psoriasicArthritis' },
    //     { code: 'DERMATITIS', name: 'atopicDermatitis' },
    //     { code: 'URTICARIA', name: 'chronicUrticaria' },
    //     { code: 'HIDRADENITIS', name: 'hidradenitisSuppurativa' },
    //     { code: 'CARCINOMA BASALES', name: 'basalCarcinoma' },
    //     { code: 'CARCINOMA ESCAMOSAS', name: 'squamousCarcinoma' },
    //     { code: 'MELANOMA', name: 'melanoma' },
    //     { code: 'OTRA', name: 'other' },
    // ];
    public indication: IndicationModel;
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

    constructor(public _activatedRoute: ActivatedRoute, private _patientsTreatmentsService: PatientsTreatmentsService, private _indicationsService: IndicationService, private _router: Router, private _translate: TranslateService) {}

    ngOnInit(): void {
        this.getData();
    }

    private getData(): void {
        this.loadingData = true;
        const view = null;
        const scheme = { domain: ['#249cf1'] };
        const type = 'BIOLOGICO';
        this.showingDetail = false;

        if (!this.entries || this.entries.length === 0) {
            this._indicationsService.getList().subscribe((indications: Array<IndicationModel>) => {
                this.entries = indications;
                if (!this.indication) this.indication = this.entries[0];
                const chartTitle = `patientsTreatment${this.indication.description.substr(0, 1).toUpperCase()}${this.indication.description.substr(1, this.indication.description.length)}`;

                this._patientsTreatmentsService.getPatientsTreatmentFindPatients(type, this.indication.id.toString()).subscribe((data) => {
                    this.loadingData = false;
                    this.data = this.parseDataChart(data);
                    this.dataChart = new ColumnChartModel(chartTitle, view, scheme, this.data);
                    this.dataTable = this.parseDataTable(data);
                });
            });
        } else {
            const chartTitle = `patientsTreatment${this.indication.description.substr(0, 1).toUpperCase()}${this.indication.description.substr(1, this.indication.description.length)}`;
            this._patientsTreatmentsService.getPatientsTreatmentFindPatients(type, this.indication.id.toString()).subscribe((data) => {
                this.loadingData = false;
                this.data = this.parseDataChart(data);
                this.dataChart = new ColumnChartModel(chartTitle, view, scheme, this.data);
                this.dataTable = this.parseDataTable(data);
            });
        }
    }

    private parseDataChart(data: any): ChartObjectModel[] {
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

    private parseDataTable(data: any[]) {
        const arrayData = Object.keys(data).map((key: any) => {
            const object = {
                typeTreatmentBiological: key,
                patients: data[key],
            };
            return object;
        });
        return arrayData;
    }

    private parseDataToTableDetails(data: any[]): any[] {
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

    onIndicationChange(event): void {
        this.indication = this.entries[event.target.value];
        this.getData();
    }

    public onIconButtonClick(event: any) {
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

    private getDetails(query: string) {
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

    private getDetailsToExport(query: string) {
        this._patientsTreatmentsService.getDetailPatientsUnderTreatmentExport(query).subscribe(
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
            const query = `type=${this.type}&indication=${this.indication}&medicine=${this.currentSelected.name}&page=${this.currentPage}&sort=${this.currentSort.column},${this.currentSort.direction}`;
            this.getDetails(query);
        }
    }

    public onSort(event: any) {
        const query = `type=${this.type}&indication=${this.indication}&medicine=${this.currentSelected.name}&page=${this.currentPage}&sort=${event.column},${event.direction}`;
        this.currentSort = event;
        this.getDetails(query);
    }
}
