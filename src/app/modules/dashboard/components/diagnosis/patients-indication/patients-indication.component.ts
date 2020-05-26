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

@Component({
  selector: 'app-patients-indication',
  templateUrl: './patients-indication.component.html',
  styleUrls: ['./patients-indication.component.scss'],
})
export class PatientsIndicationComponent implements OnInit {
  private patientsIndications: any;
  public modules: Array<HomeDashboardModule>;
  public menu: SideBarItemModel[] = [];
  public menuId: number = 2;
  public currentSection: number = 1;
  public data: ColumnChartModel;
  public dataTable: any[];
  private dataChart: ChartObjectModel[];
  public columHeaders: string[] = [
    'Tipo Psoriasis',
    'Sin artritis psoriásica',
    'Con artritis psoriásica',
    'TOTAL',
  ];
  public headersDetailsTable: string[] = [
    'Nombe',
    'Diagnóstico principal',
    'fecha',
  ];
  public showingDetail: boolean = false;
  private currentPage: number = 0;
  public paginationData: PaginationModel = {
    number: 0,
    size: 0,
    totalElements: 0,
  };
  public detailsDataTable: any[];
  private selectedDisease: string;

  public actions: TableActionsModel[] = new TableActionBuilder().getDetail();

  public actionsPatient: TableActionsModel[] = new TableActionsBuilder().getDetail();

  constructor(
    public _activatedRoute: ActivatedRoute,
    public _patientsIndicationService: PatientsIndicationService,
    private _router: Router
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

    const view = [600, 400];
    const scheme = {
      domain: ['#249cf1', '#000'],
    };
    this.dataChart = this.parseDataToChart();

    this.data = new ColumnChartModel(view, scheme, this.dataChart);

    this.dataTable = this.parseDataToTable(this.patientsIndications, false);
  }

  private parseDataToChart(): ChartObjectModel[] {
    const results: ChartObjectModel[] = [];

    Object.keys(this.patientsIndications).map((key: string) => {
      const objectData: ChartObjectModel = {
        name: key,
        value: this.patientsIndications[key],
      };
      results.push(objectData);
    });
    return results;

    // TODO: data migth come in this format:
    //Map{key, value}
    //value: int, [{string, int}]
  }

  private parseDataToTable(list: any[], details: boolean) {
    // TODO: data structure migth change.
    const data = [];
    let dataObject = {};
    if (details) {
      list.map((value: any) => {
        dataObject = {
          Nombe: value.fullName,
          'Diagnóstico principal': value.principalDiagnose,
          fecha: value.pasiDate,
        };
        data.push(dataObject);
      });
    } else {
      Object.keys(list).map((key: string) => {
        dataObject = {
          'Tipo Psoriasis': key,
          'Sin artritis psoriásica': 1,
          'Con artritis psoriásica': 2,
          TOTAL: list[key],
        };
        data.push(dataObject);
      });
    }
    return data;
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
    console.log('onPatient:', event);

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
