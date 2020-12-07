import { Component, OnInit } from '@angular/core';
import { ChartObjectModel } from 'src/app/core/models/graphs/chart-object.model';
import { GraphsService } from 'src/app/modules/dashboard/services/graphs.service';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import TableActionsBuilder from 'src/app/core/utils/TableActionsBuilder';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { Router } from '@angular/router';
import reasonBioligicalTreatment from 'src/app/core/utils/reasonBioligicalTreatment';

@Component({
    selector: 'app-number-changes-biological-treatment',
    templateUrl: './number-changes-biological-treatment.component.html',
    styleUrls: ['./number-changes-biological-treatment.component.scss'],
})
export class NumberChangesBiologicalTreatmentComponent implements OnInit {
    public showingDetail: boolean = false;
    public dataChart: ChartObjectModel[];
    public dataTable: any[];
    private treatments: any;
    public actions: TableActionsModel[] = new TableActionsBuilder().getDetail();
    public columHeaders: string[] = ['reasonStopBiologicalTreatment', 'patients'];
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

    constructor(private _graphService: GraphsService, private _router: Router) {}

    ngOnInit(): void {
        this.getTreatments();
    }

    private getTreatments(): void {
        this._graphService.getNumberChangesBiologicalTreatment().subscribe(
            (data) => {
                this.treatments = data;
                this.dataChart = this.parseDataChart(data);
                this.dataTable = this.parseDataTable(data);
            },
            (error) => {
                console.error(error);
            }
        );
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
                reasonStopBiologicalTreatment: key,
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

    public onIconButtonClick(event: any): void {
        if (event.type === 'detail') {
            this.showingDetail = true;
            this.currentTreatment = this.dataTable[event.selectedItem];

            const query = `numberChanges=${this.currentTreatment.reasonStopBiologicalTreatment}`;

            this.getDetails(query);
            this.getDetailsToExport(query);
        } else {
            this.showingDetail = false;
        }
    }

    private getDetails(query: string): void {
        this._graphService.getNumberChangesBiologicalTreatmentDetails(query).subscribe(
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

    private getDetailsToExport(query: string) {
        this._graphService.getNumberChangesBiologicalTreatmentExport(query).subscribe(
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
            const query = `numberChanges=${this.currentTreatment.reasonStopBiologicalTreatment}&${this.endCause}&reason=${this.currentTreatment.reasonStopBiologicalTreatment}&page=${this.currentPage}&sort=${this.currentSort.column},${this.currentSort.direction}`;
            this.getDetails(query);
        }
    }

    public onSort(event: any) {
        let query = `numberChanges=${this.currentTreatment.reasonStopBiologicalTreatment}&${this.endCause}&reason=${this.currentTreatment.reasonStopBiologicalTreatment}&sort=${event.column},${event.direction}&page=${this.currentPage}`;
        this.currentSort = event;
        this.getDetails(query);
    }
}
