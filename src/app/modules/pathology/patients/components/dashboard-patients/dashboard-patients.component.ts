import { Component, OnInit } from '@angular/core';
import { ColumnHeaderModel } from 'src/app/core/models/table/colum-header.model';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { PatientModel } from '../../models/patient.model';
import { FormGroup } from '@angular/forms';
import { HospitalModel } from 'src/app/core/models/hospital/hospital.model';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { PatientsService } from 'src/app/modules/management/services/patients/patients.service';
import { PatientsDashboardService } from 'src/app/modules/management/services/patients-dashboard/patients-dashboard.service';
import { ChartObjectModel } from '../../../../../core/models/graphs/chart-object.model';
import { ColumnChartModel } from '../../../../../core/models/graphs/column-chart.model';
import { GraphsService } from '../../../../dashboard/services/graphs.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManyChartModalComponent } from 'src/app/core/components/modals/many-chart-modal/many-chart-modal.component';

@Component({
  selector: 'app-dashboard-patients',
  templateUrl: './dashboard-patients.component.html',
  styleUrls: ['./dashboard-patients.component.scss'],
})
export class DashboardPatientsComponent implements OnInit {
  public menu: SideBarItemModel[] = [];
  public menuSelected: SideBarItemModel;
  public patients: PatientModel[] = [];
  // public patientKeysToShow: string[] = [
  //   'name',
  //   'nhc',
  //   'healthCard',
  //   'dni',
  //   'phone',
  //   'genderCode',
  // ];
  public selectedItem: number;
  public selectedPatient: PatientModel;

  public dataChart: ChartObjectModel[];
  public configChart: ColumnChartModel;

  constructor(
    private _patientService: PatientsService,
    private _patientDashboardService: PatientsDashboardService,
    private _graphService: GraphsService,
    private _modalService: NgbModal
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
        this.dataChart = this.parseDataChart(data);

        const title = '';
        const view = null;
        const scheme = {
          domain: ['#ffc107', '#2196f3'],
        };
        this.configChart = new ColumnChartModel(
          title,
          view,
          scheme,
          this.dataChart
        );
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

  public showModal() {
    const data = [
      {
        name: 'parsi',
        value: [
          {
            date: new Date(),
            value: '1',
          },
          {
            date: new Date('2020-06-30T00:00:00'),
            value: '2',
          },
        ],
      },
      {
        name: 'dlqi',
        value: [
          {
            date: new Date(),
            value: '1',
          },
          {
            date: new Date('2020-06-30T00:00:00'),
            value: '2',
          },
        ],
      },
    ];

    console.log(data);

    const modalRef = this._modalService.open(ManyChartModalComponent, {
      size: 'lg',
    });

    modalRef.componentInstance.title = 'Mock tes';
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.close.subscribe(() => {
      modalRef.close();
    });
  }
}
