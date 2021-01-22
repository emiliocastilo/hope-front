import { Component, OnInit } from '@angular/core';
import { ChartObjectModel } from 'src/app/core/models/graphs/chart-object.model';
import { GraphsService } from 'src/app/modules/dashboard/services/graphs.service';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import TableActionsBuilder from 'src/app/core/utils/TableActionsBuilder';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { Router } from '@angular/router';
import reasonBioligicalTreatment from 'src/app/core/utils/reasonBioligicalTreatment';
import { ColumnChartModel } from 'src/app/core/models/graphs/column-chart.model';
import { ValueKeyModel } from 'src/app/core/models/forms/value-key.model';
import { TranslateService } from '@ngx-translate/core';
import { PatientsTreatmentsService } from 'src/app/modules/management/services/patients-treatments/patients-treatments.service';
import { MedicineModel } from 'src/app/modules/management/models/medicines/medicines.model';
import { GroupedBarChartItem } from '../../vih/clinical-information/patients-vih/patients-vih-levels/patients-vih-levels.component';

export interface MedicineRegimeModel {
    actIngredient: string;
    regimes: Array<ValueKeyModel>;
}

@Component({
    selector: 'app-biological-treatment-frequency',
    templateUrl: './biological-treatment-frequency.component.html',
    styleUrls: ['./biological-treatment-frequency.component.scss'],
})
export class BiologicalTreatmentFrequencyComponent implements OnInit {
    private data: Array<MedicineRegimeModel>;
    public showingDetail: boolean = false;
    public dataChart: ChartObjectModel[];
    public dataTable: any[];
    private treatments: any;
    public actions: TableActionsModel[] = new TableActionsBuilder().getDetail();
    public columHeaders: string[] = ['actIngredients', 'de-escalate', 'standar', 'intensify', 'total'];
    public headersDetailsTable: string[] = ['nhc', 'sip', 'patient', 'principalIndication', 'principalDiagnose', 'treatment', 'pasi', 'pasiDate', 'dlqi', 'dlqiDate'];
    public currentPage: number = 0;
    public detailsDataTable: any[];
    public paginationData: PaginationModel = new PaginationModel(0, 0, 0);
    private currentTreatment: any;
    public currentSort: any = {
        column: 'nhc',
        direction: 'asc',
    };
    public details: any[] = [];
    public dataToExport: any[] = [];
    private endCause: string = `endCause=${reasonBioligicalTreatment.stop}`;
    public configChart: ColumnChartModel;

    constructor(private _graphService: GraphsService, private _patientsTreatmentService: PatientsTreatmentsService, private _translate: TranslateService, private _router: Router) {}

    ngOnInit(): void {
        this.getTreatments();
    }

    private getTreatments(): void {
        this._graphService.getBiologicalTreatmentfrequencyTableData().subscribe((response) => {
            this.treatments = response;
            const chartTitle = 'patientsDoseFrequencyBiologicalTreatment';
            const view = null;
            const scheme = { domain: ['#000', '#249cf1', '#d95f02'] };
            this.configChart = new ColumnChartModel(chartTitle, view, scheme, this.dataChart);
            this.dataTable = this.parseDataTable(response);
            this.dataChart = this.parseDataChart(response);
        });
    }

    private parseDataChart(data: any): ChartObjectModel[] {
        // data = JSON.parse('[{"medicine":{"actIngredients":"Etanercept"},"regimes":[{"name":"Estandar","value":5},{"name":"Reducida","value":24},{"name":"Intensificada","value":27}]},{"medicine":{"actIngredients":"Guselkumab"},"regimes":[{"name":"Estandar","value":14},{"name":"Reducida","value":18},{"name":"Intensificada","value":7}]},{"medicine":{"actIngredients":"Ustekinumab"},"regimes":[{"name":"Estandar","value":21},{"name":"Reducida","value":19},{"name":"Intensificada","value":13}]}]');
        const chartData = [];

        data.forEach((element) => {
            const chartGroup = { name: element.actIngredient, series: [] };
            element.regimes.forEach((regime) => chartGroup.series.push({ name: regime.name, value: regime.value }));
            chartData.push(chartGroup);
        });

        return chartData;
    }

    private parseDataTable(data: any): any[] {
        const arrayData = [];
        this.data = data;
        data.forEach((med: MedicineRegimeModel) => {
            const low = med.regimes.filter((f) => this._translate.instant('de-escalate') === f.name).length > 0 ? +med.regimes.filter((f) => this._translate.instant('de-escalate') === f.name)[0].value : 0;
            const standar = med.regimes.filter((f) => this._translate.instant('standard') === f.name).length > 0 ? +med.regimes.filter((f) => this._translate.instant('standard') === f.name)[0].value : 0;
            const intensify = med.regimes.filter((f) => this._translate.instant('intensify') === f.name).length > 0 ? +med.regimes.filter((f) => this._translate.instant('intensify') === f.name)[0].value : 0;

            arrayData.push({
                actIngredients: med.actIngredient,
                standar: standar,
                'de-escalate': low,
                intensify: intensify,
                total: standar + low + intensify,
            });
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

    public onIconButtonClick(event: any): void {
        this.dataTable = [];
        if (event.type === 'detail') {
            this.showingDetail = true;
            this.currentTreatment = this.dataTable[event.selectedItem];
            const query = `actIngredient=${this.dataTable[event.selectedItem].actIngredients}&type=BIOLOGICO`;

            this.getDetails(query);
            this.getDetailsToExport(query);
        } else {
            this.showingDetail = false;
        }
    }

    private getDetails(query: string): void {
        this._patientsTreatmentService.getDetailPatientsUnderTreatment(query).subscribe(
            (response) => {
                this.details = response.content;
                this.paginationData = response;
                this.detailsDataTable = this.parseDataToTableDetails(response.content);
            },
            (error) => console.error(error)
        );
    }

    private getDetailsToExport(query: string) {
        this._patientsTreatmentService.getDetailPatientsUnderTreatmentExport(query).subscribe(
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
            const query = `regimen=${this.currentTreatment.standar}&page=${this.currentPage}&sort=${this.currentSort.column},${this.currentSort.direction}`;
            this.getDetails(query);
        }
    }

    public onSort(event: any) {
        let query = `regimen=${this.currentTreatment.standar}&sort=${event.column},${event.direction}&page=${this.currentPage}`;
        this.currentSort = event;
        this.getDetails(query);
    }
}
