import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { stringify } from 'querystring';
import { ChartObjectModel } from 'src/app/core/models/graphs/chart-object.model';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import TableActionsBuilder from 'src/app/core/utils/TableActionsBuilder';
import { GraphsService } from 'src/app/modules/dashboard/services/graphs.service';

@Component({
  selector: 'app-patients-vih-levels',
  templateUrl: './patients-vih-levels.component.html',
  styleUrls: ['./patients-vih-levels.component.scss'],
})
export class PatientsVihLevelsComponent implements OnInit {
  // Select, datos iniciales
  selectLabel: string;
  selectedOption = 'CVP';
  selectedChart = '';

  query: string;
  //Gráfica
  dataChart: ChartObjectModel[];
  data: ChartObjectModel[];
  options = [
    {
      name: 'CVP',
    },
    {
      name: 'CD4',
    },
    {
      name: 'Grupo de riesgo',
    },
    {
      name: 'Infección viral',
    },
    {
      name: 'VHC',
    },
  ];

  //Tabla
  showingDetail = false;
  columHeaders: string[] = ['indication', 'patients'];
  dataTable: any[];
  public actions: TableActionsModel[] = new TableActionsBuilder().getDetail();

  //Detalle
  public headersDetailsTable: string[] = [
    'nhc',
    'sip',
    'patient',
    'principalDiagnose',
    'infoTreatment',
    'CVP',
    'CD4',
    'Adherence',
  ];
  public detailsDataTable: any[];
  private currentSelected: any;
  public details: any[] = [];
  public dataToExport: any[] = [];

  // Paginación
  public currentPage: number = 0;
  public paginationData: PaginationModel = new PaginationModel(0, 0, 0);
  public currentSort: any = {
    column: 'nhc',
    direction: 'asc',
  };

  constructor(
    private _graphService: GraphsService,
    public translate: TranslateService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.selectLabel = this.translate.instant('byVIHParameters');
    this.loadValues(this.selectedOption);
  }

  private getData(query: string): void {
    this._graphService.getPatientsByClinicalParameter(query).subscribe(
      (data) => {
        this.dataChart = this.parseDataChart(data);
        this.dataTable = this.parseDataTable(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSelect(event: any) {
    this.selectedOption = event.target.value;
    this.loadValues(this.selectedOption);
  }

  loadValues(selectedOption: string) {
    let query: string;
    switch (selectedOption) {
      case 'CVP':
        query = 'type=CVP';
        this.selectedChart = 'chartCVP';
        break;
      case 'CD4':
        query = 'type=CD4';
        this.selectedChart = 'chartCD4';
        break;
      case 'Grupo de riesgo':
        query = 'type=RISK';
        this.selectedChart = 'chartRISK';
        break;
      case 'Infección viral':
        query = 'type=VIRAL';
        this.selectedChart = 'chartVIRAL';
        break;
      case 'VHC':
        query = 'type=VHC';
        this.selectedChart = 'chartVHC';
        break;
    }
    this.query = query;
    this.getData(query);
  }

  private parseDataChart(data: any): ChartObjectModel[] {
    const arrayData = Object.keys(data).map((key) => {
      const object = {
        name: key,
        value: data[key],
      };
      return object;
    });

    //return arrayData;
    return [
      { name: 'ffff', value: 9 },
      { name: 'aaaaaff', value: 20 },
    ];
  }

  private parseDataTable(data: any): any[] {
    const arrayData = Object.keys(data).map((key) => {
      const object = {
        indication: key,
        patients: data[key],
      };
      return object;
    });

    return arrayData;
  }

  // Detalle
  public onIconButtonClick(event: any): void {
    if (event.type === 'detail') {
      this.showingDetail = true;
      this.currentSelected = this.dataTable[event.selectedItem];
      const query =
        this.query + '&indication=' + this.currentSelected.indication;

      this.getDetails(query);
      this.getDetailsToExport(query);
    } else {
      this.showingDetail = false;
    }
  }

  private getDetails(query: string): void {
    this._graphService.getDetailPatientsByClinicalParameter(query).subscribe(
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

  private parseDataToTableDetails(data: any[]): any[] {
    let abc;
    if (data) {
      const arrayObject = data.map((value: any) => {
        const object = {
          nhc: value.nhc,
          sip: value.healthCard,
          patient: value.fullName,
          principalIndication: value.principalIndication,
          principalDiagnose: value.principalDiagnose,
          treatment: value.treatment,
        };
        return object;
      });
      return arrayObject;
    }
  }

  private getDetailsToExport(query: string) {
    this._graphService
      .getDetailPatientsByClinicalParameterToExport(query)
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
      localStorage.setItem('selectedPatient', selectedUser);
      this._router.navigate(['pathology/patients/dashboard']);
    }
  }

  public selectPage(page: number) {
    if (this.currentPage !== page) {
      this.currentPage = page;
      const query =
        this.query +
        `&result=${this.currentSelected.indication}&page=${this.currentPage}&sort=${this.currentSort.column},${this.currentSort.direction}`;
      this.getDetails(query);
    }
  }

  public onSort(event: any) {
    const query =
      this.query +
      `&result=${this.currentSelected.indication}&page=${this.currentPage}&sort=${event.column},${event.direction}`;
    this.currentSort = event;
    this.getDetails(query);
  }
}
