import { Component, OnInit } from '@angular/core';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { PatientModel } from '../../models/patient.model';
import { PatientsService } from 'src/app/modules/management/services/patients/patients.service';
import { PatientsDashboardService } from 'src/app/modules/management/services/patients-dashboard/patients-dashboard.service';
import { ChartObjectModel } from '../../../../../core/models/graphs/chart-object.model';
import { ColumnChartModel } from '../../../../../core/models/graphs/column-chart.model';
import { ScriptLoaderService } from 'angular-google-charts';
// import { GraphsService } from '../../../../dashboard/services/graphs.service';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  public configGantt: any = {
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
        format: 'YYYY',
        gridlines: {
          count: -1,
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

  constructor(
    private _patientService: PatientsService,
    private _patientDashboardService: PatientsDashboardService,
    private loaderService: ScriptLoaderService
  ) {}

  ngOnInit(): void {
    this.selectedPatient = JSON.parse(localStorage.getItem('selectedUser'));
    this._patientService
      .getPatientsById(this.selectedPatient.id)
      .subscribe((data) => {
        if (data) {
          this.selectedPatient = data;
        }
      });

    this._patientDashboardService
      .getPatientsDashboardById(this.selectedPatient.id)
      .subscribe((data) => {
        this.data = {
          indicesEvolution: {
            DLQI: [
              {
                indexType: 'DLQI',
                value: 3.0,
                date: '2020-06-01T11:32:13.548066',
              },
              {
                indexType: 'DLQI',
                value: 5.0,
                date: '2020-06-18T11:32:13.548066',
              },
            ],
            PASI: [
              {
                indexType: 'PASI',
                value: 6.0,
                date: '2020-04-01T19:53:53.14883',
              },
              {
                indexType: 'PASI',
                value: 4.0,
                date: '2020-05-01T19:53:53.14883',
              },
              {
                indexType: 'PASI',
                value: 2.0,
                date: '2020-06-01T19:53:53.14883',
              },
            ],
          },
          treatments: {
            FAME: [
              {
                active: true,
                type: 'QUIMICO',
                medicine: {
                  dateCreated: null,
                  dateUpdated: null,
                  id: 12,
                  actIngredients: 'USTEKINUMAB',
                  codeAct: 'L04AC05',
                  acronym: '',
                  nationalCode: '713947',
                  description:
                    'STELARA 130 MG CONCENTRADO PARA SOLUCION PARA PERFUSION, 1 vial',
                  presentation:
                    'STELARA 130 MG CONCENTRADO PARA SOLUCION PARA PERFUSION, 1 vial',
                  commercialization: true,
                  biologic: true,
                  viaAdministration: null,
                  family: null,
                  brand: null,
                },
                dose: '',
                initDate: '2020-06-10T10:00:12',
                finalDate: null,
                adherence: null,
              },
            ],
            BIOLOGICO: [
              {
                active: false,
                type: 'BIOLOGICO',
                medicine: {
                  dateCreated: null,
                  dateUpdated: null,
                  id: 8,
                  actIngredients: 'GOLIMUMAB',
                  codeAct: 'L04AB06',
                  acronym: '',
                  nationalCode: '699533',
                  description:
                    'SIMPONI 100 mg SOLUCION INYECTABLE EN PLUMA PRECARGADA , 1 pluma precargada de 1 ml',
                  presentation:
                    'SIMPONI 100 mg SOLUCION INYECTABLE EN PLUMA PRECARGADA , 1 pluma precargada de 1 ml',
                  commercialization: true,
                  biologic: true,
                  viaAdministration: null,
                  family: null,
                  brand: null,
                },
                dose: '',
                initDate: '2018-06-01T19:53:53.14883',
                finalDate: null,
                adherence: null,
              },
              {
                active: false,
                type: 'BIOLOGICO',
                medicine: {
                  dateCreated: null,
                  dateUpdated: null,
                  id: 7,
                  actIngredients: 'ETANERCEPT',
                  codeAct: 'L04AB01',
                  acronym: '',
                  nationalCode: '716046',
                  description: 'BENEPALI 25 MG SOLUCION INYECTABLE',
                  presentation: 'BENEPALI 25 MG SOLUCION INYECTABLE',
                  commercialization: true,
                  biologic: true,
                  viaAdministration: null,
                  family: null,
                  brand: null,
                },
                dose: '',
                initDate: '2019-01-08T15:00:12',
                finalDate: '2020-06-10T10:00:12',
                adherence: null,
              },
              {
                active: false,
                type: 'BIOLOGICO',
                medicine: {
                  dateCreated: null,
                  dateUpdated: null,
                  id: 9,
                  actIngredients: 'INFLIXIMAB',
                  codeAct: 'L04AB02',
                  acronym: '',
                  nationalCode: '711542',
                  description:
                    'FLIXABI 100MG POLVO PARA CONCENTRADO PARA SOLUCION PARA PERFUSION, 1 vial',
                  presentation:
                    'FLIXABI 100MG POLVO PARA CONCENTRADO PARA SOLUCION PARA PERFUSION, 1 vial',
                  commercialization: true,
                  biologic: true,
                  viaAdministration: null,
                  family: null,
                  brand: null,
                },
                dose: '',
                initDate: '2019-06-01T19:53:53.14883',
                finalDate: null,
                adherence: null,
              },
              {
                active: true,
                type: 'BIOLOGICO',
                medicine: {
                  dateCreated: null,
                  dateUpdated: null,
                  id: 11,
                  actIngredients: 'SECUKINUMAB',
                  codeAct: 'L04AC10',
                  acronym: '',
                  nationalCode: '705432',
                  description:
                    'COSENTYX 150 MG SOLUCION INYECTABLE EN JERINGA PRECARGADA 2 jeringas precargadas de 1 ml',
                  presentation:
                    'COSENTYX 150 MG SOLUCION INYECTABLE EN JERINGA PRECARGADA 2 jeringas precargadas de 1 ml',
                  commercialization: true,
                  biologic: true,
                  viaAdministration: null,
                  family: null,
                  brand: null,
                },
                dose: '2mg/dia',
                initDate: '2020-06-10T10:00:12',
                finalDate: null,
                adherence: null,
              },
            ],
          },
          adherence: [],
        };

        this.dataChart = this.parseDataChart(this.data);

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

        this.loadChart(this.data);

        this.loadLines();
      });
  }

  loadLines() {
    const title = 'evolutionIndex';
    const view = null;
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
    this.parseDatesChart(start, end);
  }

  private loadChart(data: any): void {
    const dataGantt = {
      BIOLOGICO: data.treatments.BIOLOGICO,
      FAME: data.treatments.FAME,
      ADHERENCIA: data.adherence,
    };

    this.configGantt.data = this.parseDataGantt(dataGantt);

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

    chart.draw(dataTable, data.options);

    const labels = container.getElementsByTagName('text');
    Array.prototype.forEach.call(labels, function (label) {
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
          let objectRow = [
            value,
            element.medicine.actIngredients,
            element.medicine.actIngredients,
            new Date(element.initDate),
            new Date(),
          ];

          if (element.finalDate) {
            let endDate = new Date(element.finalDate);
            objectRow[objectRow.length - 1] = endDate;
          }
          objectChart.push(objectRow);
        });
      } else if (data[value] && value === 'ADHERENCIA') {
        data[value].forEach((element: any, keyTwo: number) => {
          const dateStart = new Date(element.date);
          let objectRow = [
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
