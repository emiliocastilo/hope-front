import { Component, OnInit } from '@angular/core';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { GraphsService } from '../../../services/graphs.service';
import { HomeDashboardModule } from 'src/app/core/models/home-dashboard/home-dashboard-module.model';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import TableActionsBuilder from 'src/app/core/utils/TableActionsBuilder';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cie9',
  templateUrl: './cie9.component.html',
  styleUrls: ['./cie9.component.scss'],
})
export class Cie9Component implements OnInit {
  modules: Array<HomeDashboardModule>;
  menu: SideBarItemModel[] = [];
  menuId = 2;
  currentSection = 1;
  public showingDetail = false;
  public dataChart: any[];
  public dataTable: any[];
  public columHeaders = ['cie9Diagnostic', 'patients'];
  public headersDetailsTable: string[] = [
    'nhc',
    'healthCard',
    'fullName',
    'principalIndication',
    'principalDiagnose',
    'treatment',
    'pasi',
    'pasiDate',
    'dlqi',
    'dlqiDate',
  ];
  public detailsDataTable: any[];
  paginationData: any;
  private selectedCie9: string;
  private currentPage = 0;
  public actions: TableActionsModel[] = new TableActionsBuilder().getDetail();
  public actionsPatient: TableActionsModel[] = new TableActionsBuilder().getDetail();

  constructor(private charts: GraphsService, private _router: Router) {}

  ngOnInit(): void {
    this.getData();
    this.paginationData = { size: 10 };
  }

  getData() {
    this.charts
      .getChartTableCIE9()
      .subscribe((response) => this.parseData(response));
  }

  private getPatientsDetail(selectedCie9: string) {
    const query = `page=${this.currentPage}&indication=${selectedCie9}`;
    this.charts.getPatientsDetailCIE9(query).subscribe(
      (data) => {
        this.detailsDataTable = data.content;
        this.paginationData = data;
      },
      (error) => {
        console.error('error: ', error);
      }
    );
  }

  public selectPage(page: number) {
    if (this.currentPage !== page) {
      this.currentPage = page;
      this.getPatientsDetail(this.selectedCie9);
    }
  }

  parseData(data: any) {
    this.dataChart = [];
    this.dataTable = [];
    Object.entries(data).forEach((entry) => {
      this.dataChart.push({ name: entry[0], value: entry[1] });
      this.dataTable.push({ cie9Diagnostic: entry[0], patients: entry[1] });
    });
  }

  onIconButtonClick(event: any) {
    if (event && event.type === 'detail') {
      this.showingDetail = true;
      this.selectedCie9 = this.dataChart[event.selectedItem].name;
      this.getPatientsDetail(this.selectedCie9);
    } else {
      this.showingDetail = false;
    }
  }

  public onPatientClick(event: any) {
    if (event.type === 'detail') {
      const currentUser = this.detailsDataTable[event.selectedItem];
      const selectedUser = JSON.stringify(currentUser || {});
      // TODO: data from back comes incompleted.
      localStorage.setItem('selectedUser', selectedUser);
      this._router.navigate(['pathology/patients/dashboard']);
    }
  }

  public onSortTableDetail(event: any) {
    let query = `&sort=${event.column},${event.direction}&page=${this.currentPage}&indication=${this.selectedCie9}`;

    // if (this.itemsPerPage) {
    //   query = `${query}&size=${this.itemsPerPage}`;
    // }
    this.refreshDetailTable(query);
  }

  private refreshDetailTable(query: string): void {
    this.charts.getPatientsDetailCIE9(query).subscribe(
      (data) => {
        this.detailsDataTable = data;
        this.paginationData = data;
      },
      (error) => {
        console.error('error: ', error);
      }
    );
  }
}
