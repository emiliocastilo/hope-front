import { Component, OnInit } from '@angular/core';
import { HomeDashboardModule } from '../../models/home-dashboard/home-dashboard-module.model';
import { SideBarService } from 'src/app/core/services/side-bar/side-bar.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  modules: Array<HomeDashboardModule>;

  constructor(private _sideBar: SideBarService) {}

  ngOnInit(): void {
    this._sideBar.getSideBar().subscribe((response) => {
      if (response.children) {
        this.modules = response.children;
      }
    });
  }
}
