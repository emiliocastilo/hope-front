import { Component, OnInit } from '@angular/core';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { GraphsService } from '../../../services/graphs.service';
import { HomeDashboardModule } from 'src/app/core/models/home-dashboard/home-dashboard-module.model';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import TableActionsBuilder from 'src/app/core/utils/TableActionsBuilder';

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
  public listHeaders = ['name', 'surname'];
  public listData: any[];
  paginationData: any;
  public actions: TableActionsModel[] = new TableActionsBuilder().getDetail();

  constructor(private charts: GraphsService) {}

  ngOnInit(): void {
    this.getData();
    this.paginationData = { size: 10 };
  }

  getData() {
    this.charts
      .getChartTableCIE9()
      .subscribe((response) => this.parseData(response));
  }

  getPatientsDetail(key: string) {
    this.charts
      .getPatientsDetailCIE9(key)
      .subscribe((data: any) => (this.listData = data.content));
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
      const selectedCie9 = this.dataChart[event.selectedItem].name;
      this.getPatientsDetail(selectedCie9);
    } else {
      this.showingDetail = false;
    }
  }
}
