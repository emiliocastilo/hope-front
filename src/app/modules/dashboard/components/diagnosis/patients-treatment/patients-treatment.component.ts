import { Component, OnInit } from '@angular/core';
import { ChartObjectModel } from 'src/app/core/models/graphs/chart-object.model';
import { GraphsService } from 'src/app/modules/dashboard/services/graphs.service';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import TableActionsBuilder from 'src/app/core/utils/TableActionsBuilder';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients-treatment',
  templateUrl: './patients-treatment.component.html',
  styleUrls: ['./patients-treatment.component.scss'],
})
export class PatientsTreatmentComponent implements OnInit {
  public showingDetail: boolean = false;
  public dataChart: ChartObjectModel[];
  public dataTable: any[];
  private treatments: any;
  public actions: TableActionsModel[] = new TableActionsBuilder().getDetail();
  public columHeaders: string[] = ['treatmentType', 'patients'];
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

  constructor(private _graphService: GraphsService, private _router: Router) {}

  ngOnInit(): void {
    this.getTreatments();
  }

  private getTreatments(): void {
    this._graphService.getTreatments().subscribe(
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
        name: key.toUpperCase(),
        value: data[key],
      };
      return object;
    });

    return arrayData;
  }

  private parseDataTable(data: any): any[] {
    const arrayData = Object.keys(data).map((key) => {
      const object = {
        treatmentType: key,
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

      const query = `treatmentType=${this.currentTreatment.treatmentType}`;

      this.getDetails(query);
      this.getDetailsToExport(query);
    } else {
      this.showingDetail = false;
    }
  }

  private getDetails(query: string): void {
    this._graphService.getTreatmentDetails(query).subscribe(
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
    this._graphService.getTreatmentDetailsExport(query).subscribe(
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
      const query = `treatmentType=${this.currentTreatment.treatmentType}&page=${this.currentPage}&sort=${this.currentSort.column},${this.currentSort.direction}`;
      this.getDetails(query);
    }
  }

  public onSort(event: any) {
    let query = `treatmentType=${this.currentTreatment.treatmentType}&sort=${event.column},${event.direction}&page=${this.currentPage}`;
    this.currentSort = event;
    this.getDetails(query);
  }
}
