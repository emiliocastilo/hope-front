import { Component, OnInit } from '@angular/core';
import { ColumnChartModel } from 'src/app/core/models/graphs/column-chart.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartObjectModel } from 'src/app/core/models/graphs/chart-object.model';
import { PatientsTreatmentsService } from 'src/app/modules/management/services/patients-treatments/patients-treatments.service';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import TableActionBuilder from 'src/app/core/utils/TableActionsBuilder';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-chemical-agents',
  templateUrl: './chemical-agents.component.html',
  styleUrls: ['./chemical-agents.component.scss'],
})
export class ChemicalAgentsComponent implements OnInit {
  public showingDetail = false;
  private data: ChartObjectModel[];
  public dataChart: ColumnChartModel;
  public dataTable: any[];
  public actions: TableActionsModel[] = new TableActionBuilder().getDetail();
  public columHeaders: string[] = ['typeTreatmentChemical', 'patients'];
  public headersDetailsTable: string[] = [
    'nhc',
    'sip',
    'patient',
    'principalIndication',
    'principalDiagnose',
    'treatment',
    'pasi',
    'pasiDate',
    'dlqi',
    'dlqiDate',
  ];
  private currentPage: number = 0;
  public detailsDataTable: any[];
  public paginationData: PaginationModel = new PaginationModel(0, 0, 0);
  private currentSelected: any;
  public currentSort: any = {
    column: 'nhc',
    direction: 'asc',
  };
  public details: any[] = [];
  public dataToExport: any[] = [];

  constructor(
    public _activatedRoute: ActivatedRoute,
    public _patientsTreatmentsService: PatientsTreatmentsService,
    private _router: Router,
    private _translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    const data = this._activatedRoute.snapshot.data.patientsTreatments;

    const chartTitle = ''; //patientsTreatmentChemical
    const view = null;
    const scheme = {
      domain: ['#249cf1'],
    };
    this.data = this.parseDataChart(data);

    this.dataChart = new ColumnChartModel(chartTitle, view, scheme, this.data);
    this.dataTable = this.parseDataTable(data);
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
        typeTreatmentChemical: key,
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

  public onIconButtonClick(event: any) {
    if (event && event.type === 'detail') {
      this.showingDetail = true;
      this.currentSelected = this.data[event.selectedItem];

      const query = 'type=QUIMICO&indication=""';

      this.getDetails(query);
      this.getDetailsToExport(query);
    } else {
      this.showingDetail = false;
    }
  }

  private getDetails(query: string) {
    this._patientsTreatmentsService
      .getDetailPatientsUnderTreatment(query)
      .subscribe(
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
    this._patientsTreatmentsService
      .getDetailPatientsUnderTreatmentExport(query)
      .subscribe(
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
      localStorage.setItem('selectedUser', selectedUser);
      this._router.navigate(['pathology/patients/dashboard']);
    }
  }

  public selectPage(page: number) {
    if (this.currentPage !== page) {
      this.currentPage = page;
      const query = `type=QUIMICO&indication=""&page=${this.currentPage}&sort=${this.currentSort.column},${this.currentSort.direction}`;
      this.getDetails(query);
    }
  }

  public onSort(event: any) {
    const query = `type=QUIMICO&indication=""&page=${this.currentPage}&sort=${event.column},${event.direction}`;
    this.currentSort = event;
    this.getDetails(query);
  }
}
