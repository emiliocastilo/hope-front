import { Component, OnInit } from '@angular/core';
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
  private patientsIndications: any;
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
  public headersDetailsTable: string[] = ['name', 'mainDiagnosis', 'date'];
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

  constructor(
    public _activatedRoute: ActivatedRoute,
    public _patientsIndicationService: PatientsIndicationService,
    private _router: Router,
    private _translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.patientsIndications = this._activatedRoute.snapshot.data.patientsIndications;

    const rootMenu = JSON.parse(localStorage.getItem('menu'));
    this.menu = rootMenu.filter((item) => item.url.endsWith('dashboard'));
    if (this.menu.length) {
      this.modules = rootMenu.find((item) =>
        item.url.endsWith('dashboard')
      ).children;
    }

    const chartTitle = 'patientsForIndications';
    const view = null;
    const scheme = {
      domain: ['#000', '#249cf1'],
    };
    this.dataChart = this.parseDataToChart();

    this.data = new ColumnChartModel(chartTitle, view, scheme, this.dataChart);

    this.dataTable = this.parseDataToTable(this.patientsIndications, false);
  }

  private parseDataToChart(): ChartObjectModel[] {
    const results: ChartObjectModel[] = [];

    Object.keys(this.patientsIndications).forEach((key: string) => {
      const objectData: ChartObjectModel = {
        name: key,
        series: [
          {
            name: this._translate.instant('withArthritis'),
            value: this.patientsIndications[key].true
              ? this.patientsIndications[key].true
              : 0,
          },
          {
            name: this._translate.instant('withoutArthritis'),
            value: this.patientsIndications[key].false
              ? this.patientsIndications[key].false
              : 0,
          },
        ],
      };
      results.push(objectData);
    });
    return results;
  }

  private parseDataToTable(list: any[], details: boolean) {
    const data = [];
    let dataObject = {};
    if (details) {
      list.forEach((value: any) => {
        dataObject = {
          name: value.fullName,
          mainDiagnosis: value.principalDiagnose,
          date: value.pasiDate,
        };
        data.push(dataObject);
      });
    } else {
      Object.keys(list).forEach((key: string) => {
        dataObject = {
          'Tipo Psoriasis': key,
          TOTAL: this.sumAllCases(list[key]),
        };
        dataObject[this._translate.instant('withoutArthritis')] = list[key]
          .false
          ? list[key].false
          : 0;
        dataObject[this._translate.instant('withArthritis')] = list[key].true
          ? list[key].true
          : 0;

        data.push(dataObject);
      });
    }
    return data;
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
      this.getPatientsDetail(this.selectedDisease);
    } else {
      this.showingDetail = false;
    }
  }

  public onPatientClick(event: any) {
    if (event.type === 'detail') {
      const currentUser = this.detailsDataTable[event.selectedItem];
      const selectedUser = JSON.stringify(currentUser || {});
      // TODO: data from back comes incompleted.
      localStorage.setItem('selectedUser', selectedUser);
      this._router.navigate(['pathology/patients']);
    }
  }

  private getPatientsDetail(disease: string) {
    const query = `page=${this.currentPage}&indication=${disease}`;
    this._patientsIndicationService.getDetails(query).subscribe(
      (data) => {
        this.detailsDataTable = this.parseDataToTable(data.content, true);
        this.paginationData = data;
      },
      (error) => {
        console.error('error: ', error);
      }
    );
  }

  public selectPage(page: number) {
    if (this.currentPage !== page) {
      this.currentPage = page;
      this.getPatientsDetail(this.selectedDisease);
    }
  }

  public buttonAction() {
    // TODO: make functions to export data.
  }
}
