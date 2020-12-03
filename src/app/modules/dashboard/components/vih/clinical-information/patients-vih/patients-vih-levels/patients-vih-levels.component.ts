import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ChartObjectModel } from 'src/app/core/models/graphs/chart-object.model';
import { ColumnChartModel } from 'src/app/core/models/graphs/column-chart.model';
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
  selectLabel = 'Por parámetros de VIH';
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
  ];

  //Tabla
  showingDetail = false;
  columHeaders: string[] = ['indication', 'patients'];
  dataTable: any[];
  public actions: TableActionsModel[] = new TableActionsBuilder().getDetail();

  constructor(
    private _graphService: GraphsService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
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
    //this.dataChart =  [{name: '<444', value: 8}, {name: '655', value:32}];
  }

  onSelect(event: any) {
    this.selectedOption = event.target.value;
    this.loadValues(this.selectedOption);
  }

  loadValues(selectedOption: string) {
    this.selectedChart = this.translate.instant('chart' + selectedOption);
    let query: string;
    switch (selectedOption) {
      case 'CVP':
        query = 'type=CVP';
        break;
      case 'CD4':
        query = 'type=CD4';
        break;
    }
    this.query = query;
    this.getData(query);
  }

  private parseDataChart(data: any): ChartObjectModel[] {
    // let ejemplo = [{name: '<444', value: 8}];
    // let objetoejemplo;
    const arrayData = Object.keys(data).map((key) => {
      const object = {
        name: key,
        value: data[key],
      };
      return object;
    });
    //return ejemplo;
    return arrayData;
  }

  private parseDataTable(data: any): any[] {
    const arrayData = Object.keys(data).map((key) => {
      const object = {
        name: key,
        value: data[key],
      };
      return object;
    });

    return arrayData;
  }

  onIconButtonClick($event) {
    // Query detalle
  }
}
