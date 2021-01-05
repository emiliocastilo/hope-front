import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ChartObjectModel } from 'src/app/core/models/graphs/chart-object.model';
import { ColumnChartModel } from 'src/app/core/models/graphs/column-chart.model';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import { PatientsTreatmentsService } from 'src/app/modules/management/services/patients-treatments/patients-treatments.service';
import TableActionBuilder from 'src/app/core/utils/TableActionsBuilder';
import { GraphsService } from 'src/app/modules/dashboard/services/graphs.service';

@Component({
    selector: 'app-treatment-info-vih',
    templateUrl: './treatment-info-vih.component.html',
    styleUrls: ['./treatment-info-vih.component.scss'],
})
export class TreatmentInfoVihComponent implements OnInit {
    private data: ChartObjectModel[];
    private currentPage: number = 0;
    private currentSelected: any;
    private type: string;
    private selectedOption: any;

    options = [
        {
            code: 'pref',
            name: this._translate.instant('prefInitGuidelines'),
        },
        {
            code: 'alt',
            name: this._translate.instant('alternativeGuidelines'),
        },
        { code: 'recInit', name: this._translate.instant('recommendedInitGuidelines') },
        { code: 'recChange', name: this._translate.instant('recommendedChangeGuidelines') },
        { code: 'otherTreatments', name: this._translate.instant('otherTreatments') },
    ];
    public paginationData: PaginationModel = new PaginationModel(0, 0, 0);
    public config = { defaultConfig: true };
    public loadingData: boolean = true;
    public showingDetail = false;
    public dataChart: ColumnChartModel;
    public dataTable: any[];
    public actions: TableActionsModel[] = new TableActionBuilder().getDetail();
    public columHeaders: string[] = ['treatmentType', 'patients'];
    public headersDetailsTable: string[] = ['nhc', 'sip', 'patient', 'principalDiagnose', 'treatment', 'CVP', 'CD4', 'adherence'];
    public detailsDataTable: any[];
    public currentSort: any = {
        column: 'nhc',
        direction: 'asc',
    };
    public details: any[] = [];
    public dataToExport: any[] = [];

    constructor(public _activatedRoute: ActivatedRoute, public _patientsTreatmentsService: PatientsTreatmentsService, public graphService: GraphsService, private _router: Router, private _translate: TranslateService) {}

    ngOnInit(): void {
        this.getData();
    }

    private getData(): void {
        this.showingDetail = false;
        this.loadingData = true;
        const view = null;
        const scheme = { domain: ['#249cf1'] };

        if (!this.selectedOption) this.selectedOption = this.options[0];
        const chartTitle = this.selectedOption.name;
        this.type = this.selectedOption.code;
        this.graphService.getPatientsByClinicalParameter('type=' + this.type).subscribe((data) => {
            this.loadingData = false;
            this.data = this.parseDataChart(data);
            this.dataChart = new ColumnChartModel(chartTitle, view, scheme, this.data);
            this.dataTable = this.parseDataTable(data);
        });
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

    private parseDataTable(data: any): any[] {
        const arrayData = Object.keys(data).map((key: any) => {
            const object = {
                treatmentType: key,
                patients: data[key],
            };
            return object;
        });
        return arrayData;
    }

    private parseDataToTableDetails(data: any): any[] {
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

    private getDetails(query: string) {
        query = query.replace('+', '%2B');
        this.graphService.getDetailPatientsByClinicalParameter(query).subscribe(
            (data: any) => {
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
        this.graphService.getDetailPatientsByClinicalParameterToExport(query).subscribe(
            (data: any) => {
                this.dataToExport = data;
            },
            (error) => {
                console.error(error);
            }
        );
    }

    public onSelectChange(value): void {
        this.selectedOption = this.options[value];
        this.getData();
    }

    public onIconButtonClick(event: any) {
        if (event && event.type === 'detail') {
            this.showingDetail = true;
            this.currentSelected = this.data[event.selectedItem];
            const query = 'type=' + this.type + '&indication=' + this.currentSelected.name;
            this.getDetails(query);
            this.getDetailsToExport(query);
        } else {
            this.showingDetail = false;
        }
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
            const query = `type=${this.type}&indication=${this.currentSelected.name}&page=${this.currentPage}&sort=${this.currentSort.column},${this.currentSort.direction}`;
            this.getDetails(query);
        }
    }

    public onSort(event: any) {
        const query = `type=${this.type}&indication=${this.currentSelected.name}&page=${this.currentPage}&sort=${event.column},${event.direction}`;
        this.currentSort = event;
        this.getDetails(query);
    }
}
