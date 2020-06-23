import { Component, OnInit } from '@angular/core';
import { ColumnHeaderModel } from 'src/app/core/models/table/colum-header.model';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { PatientModel } from '../../models/patient.model';
import { PatientsService } from 'src/app/modules/management/services/patients/patients.service';
import { ChartObjectModel } from 'src/app/core/models/graphs/chart-object.model';
import { GanttChart } from 'src/app/core/models/graphs/gantt-chart.model';

@Component({
  selector: 'app-dashboard-patients',
  templateUrl: './dashboard-patients.component.html',
  styleUrls: ['./dashboard-patients.component.scss'],
})
export class DashboardPatientsComponent implements OnInit {
  public columnsHeader: Array<ColumnHeaderModel> = [
    new ColumnHeaderModel('Patient Name', 2),
    new ColumnHeaderModel('Nhc', 2),
    new ColumnHeaderModel('Health Card', 2),
    new ColumnHeaderModel('Dni', 1),
    new ColumnHeaderModel('Phone', 2),
    new ColumnHeaderModel('Gender Code', 1),
    new ColumnHeaderModel('Pathologies', 1),
    new ColumnHeaderModel('Actions', 1),
  ];
  public menu: SideBarItemModel[] = [];
  public menuSelected: SideBarItemModel;
  public patients: PatientModel[] = [];
  public patientKeysToShow: string[] = [
    'name',
    'nhc',
    'healthCard',
    'dni',
    'phone',
    'genderCode',
  ];
  public selectedItem: number;
  public selectedPatient: PatientModel = {
    id: '',
    name: '',
    firstSurname: '',
    lastSurname: '',
    nhc: '',
    healthCard: '',
    dni: '',
    address: '',
    phone: '',
    email: '',
    birthDate: '',
    hospital: null,
    genderCode: '',
    pathologies: [],
  };
  private dataChart: ChartObjectModel[];
  public configChart: GanttChart;
  private columnsGantt = ['BIOLOGICO', 'FAME', 'ADH', 'OTR'];

  constructor(private _patientService: PatientsService) {}

  ngOnInit(): void {
    this.selectedPatient = JSON.parse(localStorage.getItem('selectedUser'));

    this._patientService
      .getPatientsById(this.selectedPatient.id)
      .subscribe((data) => {
        if (data) {
          this.selectedPatient = data;
          this.getDashboar(data.id);
        }
      });
  }

  private getDashboar(id: number): void {
    this._patientService.getDashboar(id).subscribe(
      (data: any) => {
        this.dataChart = this.parseDataChart(data.treatments);

        const groupByRowLabel = true;

        this.configChart = new GanttChart(
          this.dataChart,
          this.columnsGantt,
          groupByRowLabel
        );
      },
      (error: any) => {}
    );
  }

  private parseDataChart(data: any[]): ChartObjectModel[] {
    const objectChart = [];

    console.log(data);

    this.columnsGantt.forEach((value: string, key: number) => {
      if (data[value]) {
        data[value].forEach((element: any) => {
          let objectRow = [
            value,
            element.medicine.actIngredients,
            new Date(element.initDate),
          ];

          let endDate = new Date(element.finalDate);

          if (!element.finalDate) {
            endDate = new Date();
          }

          objectRow.push(endDate);

          objectChart.push(objectRow);
        });
      }
    });
    return objectChart;
  }
}
