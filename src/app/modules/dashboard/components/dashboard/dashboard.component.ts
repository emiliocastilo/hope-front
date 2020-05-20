import { Component, OnInit } from '@angular/core';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { HomeDashboardModule } from 'src/app/core/models/home-dashboard/home-dashboard-module.model';
import { ColumnChartModel } from 'src/app/core/models/graphs/column-chart.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  modules: Array<HomeDashboardModule>;
  menu: SideBarItemModel[] = [];
  menuId: number = 2;
  currentSection: number = 1;
  graphConfig: ColumnChartModel;

  constructor() {}

  ngOnInit(): void {
    const rootMenu = JSON.parse(localStorage.getItem('menu'));
    console.log(rootMenu, this.menu);
    // this.menu = rootMenu.filter((item) => item.url.endsWith('dashboard'));
    this.menu = rootMenu.filter((item) => item.title.endsWith('Cuadro de Mando'));
    if (this.menu.length) {
      this.modules = rootMenu.find((item) =>
        // item.url.endsWith('dashboard')
        item.title.endsWith('Cuadro de Mando')
      ).children;
    }

    const view: number[] = [700, 400];

    const scheme = {
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    const results = [
      {
        "name": "Germany",
        "series": [
          {
            "name": "2010",
            "value": 7300000
          },
          {
            "name": "2011",
            "value": 8940000
          }
        ]
      },
    
      {
        "name": "USA",
        "series": [
          {
            "name": "2010",
            "value": 7870000
          },
          {
            "name": "2011",
            "value": 8270000
          }
        ]
      },
    
      {
        "name": "France",
        "series": [
          {
            "name": "2010",
            "value": 5000002
          },
          {
            "name": "2011",
            "value": 5800000
          }
        ]
      }
    ];

    

    this.graphConfig = new ColumnChartModel(view, scheme, results);
  }
}
