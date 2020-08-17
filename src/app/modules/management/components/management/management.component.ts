import { Component, OnInit } from '@angular/core';
import { HomeDashboardModule } from 'src/app/core/models/home-dashboard/home-dashboard-module.model';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
})
export class ManagementComponent implements OnInit {
  // modules: Array<HomeDashboardModule>;
  // menu: SideBarItemModel[] = [];
  // public menuId: number = 4;
  children = [
    { name: 'Medicos', url: 'management/medics' },
    { name: 'Pacientes', url: 'management/patients' },
    { name: 'Roles', url: 'management/roles' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // const rootMenu = JSON.parse(localStorage.getItem('menu'));
    // this.menu = rootMenu.filter((item) => item.url.endsWith('/management'));
    // this.modules = rootMenu.find((item) =>
    //   item.url.endsWith('/management')
    // ).children;
  }

  handleChange(event) {
    const url = event.target.value;
    this.router.navigate([url]);
  }
}
