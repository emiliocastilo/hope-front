import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartObjectModel } from 'src/app/core/models/graphs/chart-object.model';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import { GraphsService } from '../../../../services/graphs.service';
import TableActionsBuilder from 'src/app/core/utils/TableActionsBuilder';
import { NotificationService } from 'src/app/core/services/notification.service';

export interface SelectOption {
    code: string;
    name: string;
    result?: string;
}

@Component({
    selector: 'app-health-outcomes',
    templateUrl: './health-outcomes.component.html',
    styleUrls: ['./health-outcomes.component.scss'],
})
export class HeatlhOutcomesComponent implements OnInit {
    public selectedOption: SelectOption;
    private selectedItem: any;

    public options: Array<SelectOption> = [
        { name: 'PASI', code: 'pasi' },
        { name: 'BSA', code: 'bsa' },
        { name: 'PGA', code: 'pga' },
        { name: 'DLQI', code: 'dlqi' },
    ];
    public config = { defaultConfig: true };
    public showingDetail: boolean = false;
    public dataChart: ChartObjectModel[];
    public dataTable: any[];
    public actions: TableActionsModel[] = new TableActionsBuilder().getDetail();
    public columHeaders: string[] = ['results', 'patients'];
    public headersDetailsTable: string[] = ['nhc', 'sip', 'patient', 'principalIndication', 'principalDiagnose', 'treatment', 'pasi', 'pasiDate', 'dlqi', 'dlqiDate'];
    public hiddenColumns: string[] = ['sip'];
    public currentPage: number = 0;
    public detailsDataTable: any[];
    public paginationData: PaginationModel = new PaginationModel(0, 0, 0);
    public currentSort: any = { column: 'nhc', direction: 'asc' };
    public details: any[] = [];
    public dataToExport: any[] = [];

    constructor(private _graphService: GraphsService, private _router: Router, private _notification: NotificationService) {}

    ngOnInit(): void {
        this.getData();
    }

    private getData(): void {
        if (!this.selectedOption) this.selectedOption = this.options[0];
        this._graphService.getFindResultsByType(`type=${this.selectedOption.name}`).subscribe(
            (data) => {
                this.showingDetail = false;
                this.dataChart = this.parseDataChart(data);
                this.dataTable = this.parseDataTable(data);
            },
            (error) => this._notification.showErrorToast(error.errorCode)
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
                results: key,
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

    private getDetails(query: string): void {
        this._graphService.getDetailsResultByType(query).subscribe(
            (data: any) => {
                this.details = data.content;
                this.paginationData = data;
                this.detailsDataTable = this.parseDataToTableDetails(data.content);
            },
            (error) => this._notification.showErrorToast(error.errorCode)
        );
    }

    private getDetailsToExport(query: string) {
        this._graphService.getDetailsResultByTypeExport(query).subscribe(
            (data: any) => {
                this.dataToExport = data;
            },
            (error) => this._notification.showErrorToast(error.errorCode)
        );
    }

    public onSelectChange(index: number) {
        this.selectedOption = this.options[index];
        this.getData();
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
            const query = `indexType=${this.selectedOption.name}&result=${this.selectedItem.results}&page=${this.currentPage}&sort=${this.currentSort.column},${this.currentSort.direction}`;
            this.getDetails(query);
        }
    }

    public onSort(event: any) {
        const query = `indexType=${this.selectedOption.name}&result=${this.selectedItem.results}&page=${this.currentPage}&sort=${event.column},${event.direction}`;
        this.currentSort = event;
        this.getDetails(query);
    }

    public onIconButtonClick(event: any): void {
        // Para click en gráfica
        if (event.name) {
            event.type = 'detail';
            event.selectedItem = this.dataTable.indexOf(this.dataTable.filter((f) => f.results === event.name)[0]);
        } else if (typeof event === 'string') {
            event = {
                type: 'detail',
                selectedItem: this.dataTable.indexOf(this.dataTable.filter((f) => f.results === event)[0]),
            };
        }

        // Click en detalle tabla

        if (event.type === 'detail') {
            this.showingDetail = true;
            this.selectedItem = this.dataTable[event.selectedItem];
            const query = `indexType=${this.selectedOption.name}&result=${this.selectedItem.results}`;
            this.getDetails(query);
            this.getDetailsToExport(query);
        } else {
            this.showingDetail = false;
        }
    }
}
