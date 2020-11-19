import { Component, OnInit } from '@angular/core';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { PatientModel } from '../../models/patient.model';
import { PatientsService } from 'src/app/modules/management/services/patients/patients.service';
import { PatientsDashboardService } from 'src/app/modules/management/services/patients-dashboard/patients-dashboard.service';
import { ChartObjectModel } from '../../../../../core/models/graphs/chart-object.model';
import { ColumnChartModel } from '../../../../../core/models/graphs/column-chart.model';
import { ScriptLoaderService } from 'angular-google-charts';
import _ from 'lodash';

@Component({
  selector: 'app-dashboard-patients',
  templateUrl: './dashboard-patients.component.html',
  styleUrls: ['./dashboard-patients.component.scss'],
})
export class DashboardPatientsComponent implements OnInit {
  public menu: SideBarItemModel[] = [];
  public menuSelected: SideBarItemModel;
  public patients: PatientModel[] = [];
  public selectedItem: number;
  public data: any;
  public globalDates: Array<any>;
  public selectedPatient: PatientModel;
  public dataChart: ChartObjectModel[];
  public configChart: ColumnChartModel;
  public configGantt: any;

  private firstDate: string = '';
  private lastDate: string = '';

  constructor(
    private patientService: PatientsService,
    private patientDashboardService: PatientsDashboardService,
    private loaderService: ScriptLoaderService
  ) {}

  setConfigGannt(): void {
    this.configGantt = {
      columns: ['BIOLOGICO', 'FAME', ' ', 'ADHERENCIA', 'OTR'],
      type: 'Timeline',
      data: [],
      options: {
        groupByRowLabel: true,
        avoidOverlappingGridLines: true,
        backgroundColor: '#FFFF',
        fontName: 'Raleway, sans-serif',
        timeline: {
          barLabelStyle: {
            fontName: 'Raleway, sans-serif',
          },
          rowLabelStyle: {
            fontName: 'Raleway, sans-serif',
          },
        },
        hAxis: {
          format: 'dd/MM/YYYY',
          gridlines: {
            count: -1,
          },
          viewWindow: {
            min: new Date(this.firstDate),
            max: new Date(this.lastDate),
          },
        },
        vAxis: {
          scaleType: 'log',
        },
        colors: [
          '#e66584',
          '#5ba6e0',
          '#e4804b',
          '#4375bb',
          '#fbbf53',
          '#57833b',
        ],
      },
    };
  }

  ngOnInit(): void {
    this.selectedPatient = JSON.parse(localStorage.getItem('selectedUser'));
    this.patientService
      .getPatientsById(this.selectedPatient.id)
      .subscribe((data) => {
        if (data) {
          this.selectedPatient = data;
        }
      });

    this.patientDashboardService
      .getPatientsDashboardById(this.selectedPatient.id)
      .subscribe((data) => {
        if (data) {
          this.data = data;
        }

        this.globalDates = _.sortBy(
          _.union(
            _.flattenDeep(
              Object.values(this.data).map((array) => {
                return Object.values(array).map((element) => {
                  return element.map((d) => {
                    return d.date
                      ? d.date.split('T')[0]
                      : d.initDate.split('T')[0];
                  });
                });
              })
            )
          )
        );

        this.firstDate = this.globalDates[0];
        this.lastDate = this.globalDates[this.globalDates.length - 1];

        this.setConfigGannt();
        this.dataChart = this.parseDataChart(this.data);
        this.loadChart(this.data);

        this.loadLines();
      });
  }

  loadLines() {
    const title = 'evolutionIndex';
    const view = null;
    const autoscale = true;
    const scheme = {
      domain: ['#ffc107', '#2196f3'],
    };
    const legend = false;
    this.configChart = new ColumnChartModel(
      title,
      view,
      scheme,
      this.dataChart,
      legend
    );
  }
  parseDatesChart(start: number, end: number) {
    const newData = {
      indicesEvolution: {
        DLQI: [],
        PASI: [],
      },
      treatments: {
        FAME: [],
        BIOLOGICO: [],
      },
      adherence: [],
    };

    Object.values(this.data).forEach((element: any) => {
      Object.values(element).forEach((v: any) => {
        v.map((i) => {
          const d = Date.parse(
            new Date(i.date ? i.date : i.initDate).toISOString().split('T')[0]
          );
          if (d >= start && d <= end) {
            if (i.date) {
              newData.indicesEvolution[i.indexType].push(i);
            }
            if (i.initDate) {
              const type = i.type === 'BIOLOGICO' ? i.type : 'FAME';
              newData.treatments[type].push(i);
            }
          }
        });
      });
    });
    this.dataChart = this.parseDataChart(newData);
    this.loadChart(newData);
    this.configChart = { ...this.configChart, results: this.dataChart };
  }

  onChangeIndexes(event: any) {
    const { min, max } = event;
    const start = Date.parse(this.globalDates[min]);
    const end = Date.parse(this.globalDates[max]);

    this.firstDate = this.globalDates[min];
    this.lastDate = this.globalDates[max];

    this.parseDatesChart(start, end);
    // console.log(this.globalDates);
    // console.log(this.firstDate, this.lastDate);

    // const tempDates = [];
    // for (let index = 0; index < this.globalDates.length; index++) {
    //     const element = this.globalDates[index];
    //     if (element >= this.firstDate && element <= this.lastDate ) tempDates.push(element);
    // }
    // console.log(tempDates);
  }

  private loadChart(data: any): void {
    const dataGantt = {
      BIOLOGICO: data.treatments.BIOLOGICO,
      FAME: data.treatments.FAME,
      ADHERENCIA: data.adherence,
    };

    console.log(
      `start: ${this.firstDate} | end: ${this.lastDate} -------------------------------`
    );
    this.configGantt.data = this.parseDataGantt(dataGantt);
    this.configGantt.options.hAxis.viewWindow = {
      min: new Date(this.firstDate),
      max: new Date(this.lastDate),
    };

    console.log(this.configGantt);
    this.loaderService
      .loadChartPackages(this.configGantt.type)
      .subscribe(() => {
        google.charts.load('current', { packages: ['timeline'] });
        google.charts.setOnLoadCallback(this.drawChart(this.configGantt));
      });
  }

  public drawChart(data: any): any {
    const container = document.getElementById('google-timeline-chart');
    const chart = new google.visualization.Timeline(container);
    const dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'string', id: 'Title' });
    dataTable.addColumn({ type: 'string', id: 'Name' });
    dataTable.addColumn({ type: 'string', role: 'tooltip' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });

    dataTable.addRows(data.data);

    console.log(this.configGantt.options.hAxis.viewWindow);

    chart.draw(dataTable, data.options);

    const labels = container.getElementsByTagName('text');
    Array.prototype.forEach.call(labels, (label) => {
      if (label.getAttribute('text-anchor') === 'middle') {
        label.setAttribute('font-family', '"Raleway", sans-serif');
      }

      if (
        label.getAttribute('font-weight') !== 'bold' &&
        label.getAttribute('text-anchor') === 'middle'
      ) {
        label.setAttribute('display', 'none');
      }
    });
  }

  private parseDataChart(data: any): ChartObjectModel[] {
    const arrayData = Object.keys(data.indicesEvolution).map(
      (keyYear: string) => {
        const object = {
          name: keyYear,
          series: [],
        };

        data.indicesEvolution[keyYear].forEach((element) => {
          const objectSerie = {
            value: element.value,
            name: new Date(element.date),
          };
          object.series.push(objectSerie);
        });

        return object;
      }
    );
    return arrayData;
  }

  private parseDataGantt(data: any): ChartObjectModel[] {
    const objectChart = [];

    this.configGantt.columns.forEach((value: string, key: number) => {
      if (data[value] && value !== 'ADHERENCIA') {
        data[value].forEach((element: any, keyT: number) => {
          const objectRow = [
            value,
            element.medicine.actIngredients,
            element.medicine.actIngredients,
            new Date(element.initDate),
            new Date(this.globalDates[this.globalDates.length - 1]),
          ];

          if (element.finalDate) {
            const endDate = new Date(element.finalDate);
            objectRow[objectRow.length - 1] = endDate;
          }
          objectChart.push(objectRow);
        });
      } else if (data[value] && value === 'ADHERENCIA') {
        data[value].forEach((element: any, keyTwo: number) => {
          const dateStart = new Date(element.date);
          const objectRow = [
            value,
            '',
            element.description,
            dateStart,
            dateStart,
          ];

          objectChart.push(objectRow);
        });
      }
    });
    return objectChart;
  }
}
