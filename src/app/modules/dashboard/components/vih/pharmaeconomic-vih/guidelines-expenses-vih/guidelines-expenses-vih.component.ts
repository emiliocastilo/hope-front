import { Component, OnInit, OnChanges } from '@angular/core';
import { ChartObjectModel } from 'src/app/core/models/graphs/chart-object.model';
import { GraphsService } from 'src/app/modules/dashboard/services/graphs.service';
import { ColumnChartModel } from 'src/app/core/models/graphs/column-chart.model';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import TableActionsBuilder from 'src/app/core/utils/TableActionsBuilder';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-guidelines-expenses-vih',
  templateUrl: './guidelines-expenses-vih.component.html',
  styleUrls: ['./guidelines-expenses-vih.component.scss']
})
export class GuidelinesExpensesVihComponent implements OnInit {

  options = [
    {
      name: this._translate.instant('alternativeGuidelines')
    },
    {
      name: this._translate.instant('initialGuidelines')
    }
  ];
 
  selectLabel = this._translate.instant('costs');
  selectedOption = this.options[0].name;
  selectedChart: string;

  public form: FormGroup = new FormGroup({
    switchValue: new FormControl(),
    maxValue: new FormControl()
  });
  
  // Queries gráfica y tabla
  query: string;
 

  
  public dataChart: ChartObjectModel[];
  public configChart: ColumnChartModel;
  accumulated = false;
  maxAvgAnualValue: number;
  
   // Paginación
   public currentPage: number = 0;
   public paginationData: PaginationModel = new PaginationModel(0, 0, 0);
   public currentSort: any = {
     column: 'nhc',
     direction: 'asc',
   };

  constructor(
    private _graphService: GraphsService,
    private fb: FormBuilder,
    private _router: Router,
    private _translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.fb.group({
      switchValue: [false],
      maxValue: []
    });    
 
    this.loadValues(this.selectedOption);    
  }

  switchAccumulated(){
    this.accumulated = !this.accumulated;   
    this.loadValues(this.selectedOption);  
  }

  private getExpenses(query: string): void {
    
    this._graphService.getCostsByPatientType(query).subscribe(
      (data) => {
        const dataToParse = this.sortByMonth(data);
        this.dataChart = this.parseDataChart(dataToParse);

        const title = this.selectedChart;
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
      // console.log(data.ene);
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

  // TODO - plopezc - descomentar al quitar mock
  private sortByMonth(arr: any): any {
    var months = [
      'ene',
      'feb',      
      'mar'/* ,
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


  onSelect(event: any) {
    this.selectedOption = event.target.value;
    this.loadValues(this.selectedOption);
  }

  switchOptions(event:any){
    this.accumulated = !this.accumulated;    
    this.loadValues(this.selectedOption);
  }

  loadValues(selectedOption: string, maxValue?: number) {
    let query: string;
    switch (selectedOption) {
      case this.options[0].name:
        if(!this.accumulated){
        query = 'type=total';
        this.selectedChart = 'totalCostByPatientType';
        } else{
          query='type=totalAccumulated';
          this.selectedChart = 'totalAccumulatedCostByPatientType';
        }
        break;
      case this.options[1].name:
        if(!this.accumulated){
          query = 'type=avg';
          this.selectedChart = 'avgCostByPatientType';
          } else{
            query='type=avgAccumulated';
            this.selectedChart = 'avgAccumulatedCostByPatientType';
          }
          query += maxValue ? '&max=' + maxValue : '';
          console.log("query", query);
          break;
    }
    this.query = query;       
    //this.getExpenses(query);   
    this.mockData();
  }
  
  //TODO - plopezc -borrar cuando esté back
  public mockData(){
    //const query = `code=${this.currenMedicine.codeAct}`;
    /* this._graphService.getTotalExpenses(query).subscribe(
      (data) => { */
       const data = {ene:{"En ensayo clínico":500,"Controlados y estables":100},
       feb:{"En ensayo clínico":200,"Controlados y estables":190},
       mar:{"En ensayo clínico":350,"Controlados y estables":400}};
        const dataToParse = this.sortByMonth(data);
        this.dataChart = this.parseDataChart(dataToParse);     

        const title = this.selectedChart;
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
    
}


}
