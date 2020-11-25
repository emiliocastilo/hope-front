import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { HomeDashboardModule } from 'src/app/core/models/home-dashboard/home-dashboard-module.model';
import { ColumnChartModel } from 'src/app/core/models/graphs/column-chart.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartObjectModel } from 'src/app/core/models/graphs/chart-object.model';
import { PatientsIndicationService } from 'src/app/modules/management/services/patients-indication/patients-indication.service';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import TableActionBuilder from 'src/app/core/utils/TableActionsBuilder';
import TableActionsBuilder from 'src/app/core/utils/TableActionsBuilder';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-patients-indication',
  templateUrl: './patients-indication.component.html',
  styleUrls: ['./patients-indication.component.scss'],
})
export class PatientsIndicationComponent implements OnInit {
  public modules: Array<HomeDashboardModule>;
  public menu: SideBarItemModel[] = [];
  public menuId = 2;
  public currentSection = 1;
  public data: ColumnChartModel;
  public dataTable: any[];
  private dataChart: ChartObjectModel[];
  public columHeaders: string[] = [
    'Tipo Psoriasis',
    this._translate.instant('withoutArthritis'),
    this._translate.instant('withArthritis'),
    'TOTAL',
  ];
  public headersDetailsTable: string[] = [
    'nhc',
    'healthCard',
    'fullName',
    'principalIndication',
    'principalDiagnose',
    'treatment',
    'pasi',
    'pasiDate',
    'dlqi',
    'dlqiDate',
  ];
  public showingDetail = false;
  private currentPage = 0;
  public paginationData: PaginationModel = {
    number: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
  };
  public detailsDataTable: any[];
  private selectedDisease: string;

  public actions: TableActionsModel[] = new TableActionBuilder().getDetail();

  public actionsPatient: TableActionsModel[] = new TableActionsBuilder().getDetail();

  public dataToExport: any[] = [];

  constructor(
    public _activatedRoute: ActivatedRoute,
    public _patientsIndicationService: PatientsIndicationService,
    private _router: Router,
    private _translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this._patientsIndicationService
      .getPatiensDiagnosesByIndications()
      .subscribe((response) => {
        this.parseDataToChart(response);
        this.parseDataToTable(response);
      });
  }

  private parseDataToChart(patiensIndication: any) {
    this.dataChart = [];

    Object.keys(patiensIndication).forEach((key: string) => {
      const objectData: ChartObjectModel = {
        name: key,
        series: [
          {
            name: this._translate.instant('withArthritis').toUpperCase(),
            value: patiensIndication[key].true
              ? patiensIndication[key].true
              : 0,
          },
          {
            name: this._translate.instant('withoutArthritis').toUpperCase(),
            value: patiensIndication[key].false
              ? patiensIndication[key].false
              : 0,
          },
        ],
      };
      this.dataChart.push(objectData);
    });

    const chartTitle = 'patientsForIndications';
    const view = null;
    const scheme = {
      domain: ['#000', '#249cf1'],
    };
    this.data = new ColumnChartModel(chartTitle, view, scheme, this.dataChart);
  }

  private parseDataToTable(list: any[]) {
    const data = [];
    let dataObject = {};
    Object.keys(list).forEach((key: string) => {
      dataObject = {
        'Tipo Psoriasis': key,
        TOTAL: this.sumAllCases(list[key]),
      };
      dataObject[this._translate.instant('withoutArthritis')] = list[key].false
        ? list[key].false
        : 0;
      dataObject[this._translate.instant('withArthritis')] = list[key].true
        ? list[key].true
        : 0;

      data.push(dataObject);
    });
    this.dataTable = data;
  }

  private sumAllCases(object: any): number {
    let total = 0;

    total += object.true ? object.true : 0;
    total += object.false ? object.false : 0;

    return total;
  }

  public onIconButtonClick(event: any) {
    if (event && event.type === 'detail') {
      this.showingDetail = true;
      this.selectedDisease = this.dataChart[event.selectedItem].name;
      const query = `&page=${this.currentPage}&indication=${this.selectedDisease}`;
      this.getPatientsDetail(query);
      this.getDetailsToExport(query);
    } else {
      this.showingDetail = false;
    }
  }

  public onPatientClick(event: any) {
    if (event.type === 'detail') {
      const currentUser = this.detailsDataTable[event.selectedItem];
      const selectedUser = JSON.stringify(currentUser || {});
      localStorage.setItem('selectedUser', selectedUser);
      this._router.navigate(['pathology/patients/dashboard']);
    }
  }

  private getPatientsDetail(query: string) {
    this._patientsIndicationService.getDetails(query).subscribe(
      (data) => {
        this.detailsDataTable = data.content;
        if (this.paginationData.totalPages !== data.totalPages) {
          this.paginationData = data;
        }
      },
      (error) => {
        console.error('error: ', error);
      }
    );
  }

  public selectPage(page: number) {
    if (this.currentPage !== page) {
      this.currentPage = page;
      const query = `&page=${this.currentPage}&indication=${this.selectedDisease}`;
      this.getPatientsDetail(query);
    }
  }

  public onSortTableDetail(event: any) {
    let query = `&sort=${event.column},${event.direction}&page=${this.currentPage}&indication=${this.selectedDisease}`;

    this.getPatientsDetail(query);
  }

  private getDetailsToExport(query: string) {
    this._patientsIndicationService.getDetailsExport(query).subscribe(
      (data: any) => {
        this.dataToExport = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
