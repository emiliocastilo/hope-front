import { Component, OnInit } from '@angular/core';
import { ChartObjectModel } from 'src/app/core/models/graphs/chart-object.model';
import { GraphsService } from 'src/app/modules/dashboard/services/graphs.service';
import { ColumnChartModel } from 'src/app/core/models/graphs/column-chart.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MedicinesServices } from 'src/app/core/services/medicines/medicines.services';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import TableActionsBuilder from 'src/app/core/utils/TableActionsBuilder';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-patient-expenses-vih',
  templateUrl: './patient-expenses-vih.component.html',
  styleUrls: ['./patient-expenses-vih.component.scss']
})
export class PatientExpensesVihComponent implements OnInit {

  options = [
    {
      name: this.translate.instant('total')
    },
    {
      name: this.translate.instant('average')
    }
  ];
  selectLabel = this.translate.instant('costs');
  selectedOption = this.options[0].name;
  selectedChart: string;
  query: string;
  switchValue = false;
 

  //Tabla
  showingDetail = false;
  columHeaders: string[] = ['patientType', 'patients'];
  dataTable: any[];
  public detailsDataTable: any[];
  private currentSelected: any;
  public details: any[] = [];
  public dataToExport: any[] = [];
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


  public actions: TableActionsModel[] = new TableActionsBuilder().getDetail();
  public dataChart: ChartObjectModel[];
  public configChart: ColumnChartModel;
  public currenMedicine: any;
  public medicines: any;
  public form: FormGroup = new FormGroup({
    selectMedicine: new FormControl(),
  });

   // Paginación
   public currentPage: number = 0;
   public paginationData: PaginationModel = new PaginationModel(0, 0, 0);
   public currentSort: any = {
     column: 'nhc',
     direction: 'asc',
   };

  constructor(
    private _graphService: GraphsService,
    private _medicinesService: MedicinesServices,
    private _router: Router,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.mockData();
  }

  private getTreatments(): void {
    const query = `code=${this.currenMedicine.codeAct}`;
    this._graphService.getTotalExpenses(query).subscribe(
      (data) => {
        const dataToParse = this.sortByMonth(data);
        this.dataChart = this.parseDataChart(dataToParse);

        const title = 'totalCost';
        const view = null;
        const scheme = {
          domain: ['#ffc107', '#2196f3', '#4caf50', '#cc0606'],
        };
        this.configChart = new ColumnChartModel(
          title,
          view,
          scheme,
          this.dataChart
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  private parseDataChart(data: any): ChartObjectModel[] {
    const arrayData = Object.keys(data.ene).map((keyYear: string) => {
      const object = {
        name: keyYear,
        series: [],
      };

      Object.keys(data).forEach((keyMonth: string) => {
        const objectSerie = {
          value:
            data[keyMonth][keyYear] && data[keyMonth][keyYear] !== '-'
              ? data[keyMonth][keyYear]
              : 0,
          name: keyMonth,
        };
        object.series.push(objectSerie);
      });

      return object;
    });
    return arrayData;
  }

  private sortByMonth(arr: any): any {
    var months = [
      'ene',
      'feb',
      /*
      'mar',
      'abr',
      'may',
      'jun',
      'jul',
      'ago',
      'sep',
      'oct',
      'nov',
      'dic', */
    ];
    const object = {};
    months.forEach((month: string) => {
      object[month] = arr[month];
    });

    return object;
  }

/*   private getMedicines(): void {
    const query = 'size=1000';
    this._medicinesService.getAll(query).subscribe(
      (data) => {
        if (!data.empty) {
          this.medicines = data.content;
          this.addNameToMedicine(this.medicines);
          this.currenMedicine = this.medicines[0];
          this.getTreatments();
        }
      },
      (error) => {
        console.error(error);
      }
    );
  } */

  public onFormSubmit(): void {
    this.dataChart = null;
    this.getTreatments();
  }

  public onSelectMedicine(event: any): void {
    this.dataChart = null;
    this.currenMedicine = event;
    this.getTreatments();
  }

  private addNameToMedicine(array: any[]): void {
    array.forEach((value: any, key: number) => {
      array[key].name = array[key].actIngredients;
    });
  }

  onSelect(event: any) {
    this.selectedOption = event.target.value;
    this.loadValues(this.selectedOption);
  }
  loadValues(selectedOption: string) {
    let query: string;
    switch (selectedOption) {
      case this.options[0].name:
        query = 'type=cause';
        this.selectedChart = 'changeCause';
        break;
      case this.options[1].name:
        query = 'type=failure';
        this.selectedChart = 'chartFailure';
        break;
      case this.options[2].name:
        query = 'type=RAMS';
        this.selectedChart = 'chartRAMS';
        break;
      case this.options[3].name:
        query = 'type=changequantity';
        this.selectedChart = 'chartChangeQuantity';
        break;
    }
    this.query = query;
    this.getData(query);
  }
  private getData(query: string): void {
    this._graphService.getPatientsByTreatmentChange(query).subscribe(
      (data) => {
        this.dataChart = this.parseDataChart(data);
        this.dataTable = this.parseDataTable(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  private parseDataTable(data: any): any[] {    
    const arrayData = Object.keys(data).map((key) => {
      const object = {
        patientType: key,
        patients: data[key],
      };
      return object;
    });

    return arrayData;
  }


  // DETALLE
  // Detalle
  public onIconButtonClick(event: any): void {
    if (event.type === 'detail') {
      this.showingDetail = true;
      this.currentSelected = this.dataTable[event.selectedItem];
      const query = this.query + '&reason=' + this.currentSelected.changeCause;

      this.getDetails(query);
      this.getDetailsToExport(query);
    } else {
      this.showingDetail = false;
    }
  }

  private getDetails(query: string): void {
    this._graphService.getDetailPatientsByTreatmentChange(query).subscribe(
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
      .getDetailPatientsByTreatmentChangeToExport(query)
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
        `&result=${this.currentSelected.changeCause}&page=${this.currentPage}&sort=${this.currentSort.column},${this.currentSort.direction}`;
      this.getDetails(query);
    }
  }

  public onSort(event: any) {
    const query =
      this.query +
      `&result=${this.currentSelected.changeCause}&page=${this.currentPage}&sort=${event.column},${event.direction}`;
    this.currentSort = event;
    this.getDetails(query);
  }

  //plopezc -borrar cuando haya datos reales
  public mockData(){
    //const query = `code=${this.currenMedicine.codeAct}`;
    /* this._graphService.getTotalExpenses(query).subscribe(
      (data) => { */
       const data = {ene:{"2019 - Pacientes Controlados":5,"2020 - Todos los pacientes":10,"2020 - Pacientes Controlados":20,"2019 - Todos los pacientes":25},
       feb:{"2019 - Pacientes Controlados":12,"2020 - Todos los pacientes":19,"2020 - Pacientes Controlados":10,"2019 - Todos los pacientes":90}};
        const dataToParse = this.sortByMonth(data);
        this.dataChart = this.parseDataChart(dataToParse);
        this.dataTable = this.parseDataTable(data);

        const title = 'totalCost';
        const view = null;
        const scheme = {
          domain: ['#ffc107', '#2196f3', '#4caf50', '#cc0606'],
        };
        this.configChart = new ColumnChartModel(
          title,
          view,
          scheme,
          this.dataChart
        );
     
    
   //this.dataChart =[{"jul":{"2019 - Pacientes Controlados":0.00,"2020 - Todos los pacientes":0.00,"2020 - Pacientes Controlados":0.00,"2019 - Todos los pacientes":0.00}
  /* 
   this.dataChart = [ { name: 'Fallo Viral', value: 9 },
      { name: "RAMs", value: 20 }, { name: 'Número de cambios por tratamiento', value: 9 }] */
}

}
