import { Component, OnInit } from '@angular/core';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { HomeDashboardModule } from 'src/app/core/models/home-dashboard/home-dashboard-module.model';
import { ColumnChartModel } from 'src/app/core/models/graphs/column-chart.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartObjectModel } from 'src/app/core/models/graphs/chart-object.model';
import { PatientsTreatmentsService } from 'src/app/modules/management/services/patients-treatments/patients-treatments.service';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import TableActionBuilder from 'src/app/core/utils/TableActionsBuilder';
import TableActionsBuilder from 'src/app/core/utils/TableActionsBuilder';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-biological-agents',
  templateUrl: './biological-agents.component.html',
  styleUrls: ['./biological-agents.component.scss']
})
export class BiologicalAgentsComponent implements OnInit {
  private patientsTreatments: any;
  public modules: Array<HomeDashboardModule>;
  public menu: SideBarItemModel[] = [];

  public data: ColumnChartModel;
  public dataTable: any[];
  private dataChart: ChartObjectModel[];
  public columHeaders: string[] = [
    'Tipo de tratamiento biológico',
    'Pacientes',
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
    public _patientsTreatmentsService: PatientsTreatmentsService,
    private _router: Router,
    private _translate: TranslateService
  ) {}

  ngOnInit(): void {
    let mockData = {
      'EN PLACAS': 2,
      'PUSTULOSA': 3,
      'ERITRODERMIA': 4,
      'PALMOPLANTAR': 5,
      'OTRAS': 5
    };
    this.patientsTreatments = mockData;
    // this.patientsTreatments = this._activatedRoute.snapshot.data.patientsTreatments;

    const chartTitle = 'patientsForIndications';
    const view = null;
    const scheme = {
      domain: ['#000', '#249cf1'],
    };
    this.dataChart = this.parseDataToChart();

    this.data = new ColumnChartModel(chartTitle, view, scheme, this.dataChart);

    this.dataTable = this.parseDataToTable(this.patientsTreatments, false);

  }

  private parseDataToChart(): ChartObjectModel[] {
    const results: ChartObjectModel[] = [];

    Object.keys(this.patientsTreatments).forEach((key: string) => {
      const objectData: ChartObjectModel = {
        name: key,
        series: [
          {
            name: 'Pacientes',
            value: this.patientsTreatments[key]
          }
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
          'Tipo de tratamiento biológico': key,
          Pacientes: list[key],
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
    if (event.type === 'detail') {
      const currentUser = this.detailsDataTable[event.selectedItem];
      const selectedUser = JSON.stringify(currentUser || {});
      // TODO: data from back comes incompleted.
      localStorage.setItem('selectedUser', selectedUser);
      this._router.navigate(['pathology/patients']);
    }
  }

  private getPatientsDetail(disease: string) {
    this._patientsTreatmentsService.getPatientsTreatmentDetailPatients('biologico').subscribe(
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
