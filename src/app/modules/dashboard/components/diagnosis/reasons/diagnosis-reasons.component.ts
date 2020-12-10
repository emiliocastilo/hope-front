import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ChartObjectModel } from 'src/app/core/models/graphs/chart-object.model';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import { NotificationService } from 'src/app/core/services/notification.service';
import TableActionsBuilder from 'src/app/core/utils/TableActionsBuilder';
import { GraphsService } from '../../../services/graphs.service';

export interface SelectOption {
    code: string;
    name: string;
    literal: string;
}
export interface DataLoadingConfig {
    selectValue: SelectOption;
    years: number;
}

@Component({
    selector: 'app-diagnosis-reasons',
    templateUrl: './diagnosis-reasons.component.html',
    styleUrls: ['./diagnosis-reasons.component.scss'],
})
export class DiagnosisReasonsComponent implements OnInit {
    public config = { showYears: true };
    public showingDetail: boolean = false;
    public dataChart: ChartObjectModel[];
    public dataTable: any[];
    public selectedOption: SelectOption;
    public options: Array<SelectOption>;
    public dataConfig: DataLoadingConfig = {
        selectValue: undefined,
        years: 0
    };

    public actions: TableActionsModel[] = new TableActionsBuilder().getDetail();
    public columHeaders: string[] = ['reasonLastChangeBiologicalTreatment', 'patients'];
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
    private cause: string;
    private treatments;

    constructor(
        private _graphService: GraphsService,
        private _router: Router,
        private _notification: NotificationService
    ) { }

    ngOnInit (): void {
        this.options = [
            { code: 'change', name: 'change', literal: 'Cambio' },
            { code: 'suspension', name: 'suspension', literal: 'Suspensión' }
        ];
        this.dataConfig = {
            selectValue: this.options[0],
            years: 0
        };
        this.loadData();
    }

    private getData (): Observable<any> {
        return new Observable<any>(
            observer => {
                if (this.dataConfig.years == 0) {
                    this.cause = `endCause=${this.dataConfig.selectValue.literal}`
                    this._graphService.getReasonLastChangeBiological(this.cause).subscribe(
                        data => observer.next(data), error => observer.next(error)
                    );
                } else {
                    this.cause = `endCause=${this.dataConfig.selectValue.literal}&years=5`
                    this._graphService.getReasonLastChangeBiologicalFiveYears(this.cause).subscribe(
                        data => observer.next(data), error => observer.next(error)
                    );
                }
            }
        );
    }

    private loadData () {
        this.getData().subscribe(data => {
            this.treatments = data;
            this.dataChart = this.parseDataChart(data);
            this.dataTable = this.parseDataTable(data);
        }, error => {
            this._notification.showErrorToast(error.errorCode)
        });
    }

    private parseDataChart (data: any): ChartObjectModel[] {
        const arrayData = Object.keys(data).map((key) => {
            const object = {
                name: key.toUpperCase(),
                value: data[key],
            };
            return object;
        });

        return arrayData;
    }

    private parseDataTable (data: any): any[] {
        const arrayData = Object.keys(data).map((key) => {
            const object = {
                reasonLastChangeBiologicalTreatment: key,
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

    private getDetails (query: string): void {
        this._graphService.getReasonLastChangeBiologicalDetails(query).subscribe(
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

    private getDetailsToExport (query: string) {
        this._graphService.getReasonLastChangeBiologicalDetailsExport(query).subscribe(
            (data: any) => {
                this.dataToExport = data;
            },
            (error) => {
                console.error(error);
            }
        );
    }

    public onInputChange (years: number) {
        this.dataConfig.years = years;
        console.log(this.dataConfig, years);
        this.loadData();
    }

    public onSelectChange (index: number) {
        this.dataConfig.selectValue = this.options[index];
        this.loadData();
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
            const query = `${this.cause}&reason=${this.currentTreatment.reasonLastChangeBiologicalTreatment}&page=${this.currentPage}&sort=${this.currentSort.column},${this.currentSort.direction}`;
            this.getDetails(query);
        }
    }

    public onSort (event: any) {
        let query = `${this.cause}&reason=${this.currentTreatment.reasonLastChangeBiologicalTreatment}&sort=${event.column},${event.direction}&page=${this.currentPage}`;
        this.currentSort = event;
        this.getDetails(query);
    }

    public onIconButtonClick (event: any): void {
        if (event.type === 'detail') {
            this.showingDetail = true;
            this.currentTreatment = this.dataTable[event.selectedItem];

            const query = `${this.cause}&reason=${this.currentTreatment.reasonLastChangeBiologicalTreatment}`;

            this.getDetails(query);
            this.getDetailsToExport(query);
        } else {
            this.showingDetail = false;
        }
    }
}
