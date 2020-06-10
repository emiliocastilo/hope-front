import { Component, OnInit } from '@angular/core';
import { HomeDashboardModule } from 'src/app/core/models/home-dashboard/home-dashboard-module.model';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import TableActionsBuilder from 'src/app/core/utils/TableActionsBuilder';
import { GraphsService } from '../../../services/graphs.service';

@Component({
  selector: 'app-patients-by-bsa',
  templateUrl: './patients-by-bsa.component.html',
  styleUrls: ['./patients-by-bsa.component.scss']
})
export class PatientsByBsaComponent implements OnInit {
  modules: Array<HomeDashboardModule>;
  menu: SideBarItemModel[] = [];

  public showingDetail = false;
  public dataChart: any[];
  public dataTable: any[];
  public columHeaders = ['resultsBSA', 'patients'];
  public listHeaders = ['name', 'surname'];
  public listData: any[];
  paginationData: any;
  public actions: TableActionsModel[] = new TableActionsBuilder().getDetail();

  constructor(private charts: GraphsService) { }

  ngOnInit(): void {
    this.getData();
    this.paginationData = { size: 10 };
  }

  getData() {
    this.charts
      .getHealthOutcomesFindByType('bsa')
      .subscribe((response) => this.parseData(response));
  }

  getPatientsDetail(key: string) {
    this.charts
      .getHealthOutcomesDetailResultByType(key)
      .subscribe((data: any) => (this.listData = data.content));
  }

  parseData(data: any) {
    this.dataChart = [];
    this.dataTable = [];
    Object.entries(data).forEach((entry) => {
      this.dataChart.push({ name: entry[0], value: entry[1] });
      this.dataTable.push({ resultsBSA: entry[0], patients: entry[1] });
    });
  }

  onIconButtonClick(event: any) {
    if (event && event.type === 'detail') {
      this.showingDetail = true;
      const selected = this.dataChart[event.selectedItem].name;
      this.getPatientsDetail(selected);
    } else {
      this.showingDetail = false;
    }
  }
}
