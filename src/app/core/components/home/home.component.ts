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
    this.getMenu();
  }

  private getMenu(): void {
    this._sideBar.getSideBar().subscribe((response) => {
      if (response.children) {
        this.modules = response.children;
        this.parseMenu(this.modules);
        //   localStorage.setItem('menu', JSON.stringify(this.modules));
      }
    });

    // this.modules = JSON.parse(localStorage.getItem('menu'));
  }

  parseMenu(menu: any) {
    const mainMenu = menu.map((entry) => {
      if (entry.title === 'Paciente') {
        localStorage.setItem('patientMenu', JSON.stringify(entry.children));
        entry.children = [];
      }
      return entry;
    });
    localStorage.setItem('mainMenu', JSON.stringify(mainMenu));
  }
}
