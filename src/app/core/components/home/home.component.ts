import { Component, OnInit } from '@angular/core';
import { HomeDashboardModule } from '../../models/home-dashboard/home-dashboard-module.model';
import { SideBarService } from '../../services/side-bar/side-bar.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  modules: Array<HomeDashboardModule>;

  constructor(private _sidebar: SideBarService) {}

  ngOnInit(): void {
    this.modules = JSON.parse(localStorage.getItem('menu'));
    if (!this.modules) {
      this.fetchModules();
    }
  }

  async fetchModules() {
    const response: any = await this._sidebar.getSideBar();
    this.modules = response.children;
  }
}
