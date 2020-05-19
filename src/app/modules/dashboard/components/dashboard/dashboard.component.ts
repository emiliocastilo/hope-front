import { Component, OnInit } from '@angular/core';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { HomeDashboardModule } from 'src/app/core/models/home-dashboard/home-dashboard-module.model';

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

  constructor() {}

  ngOnInit(): void {
    const rootMenu = JSON.parse(localStorage.getItem('menu'));
    this.menu = rootMenu.filter((item) => item.url.endsWith('/dashboard'));
    if (this.menu.length) {
      this.modules = rootMenu.find((item) =>
        item.url.endsWith('/dashboard')
      ).children;
    } else {
      this.modules = [
        {
          id: 1,
          order: '1',
          title: 'Info. diagnosticos',
          description: 'SecciÃ³n que contiene la Cuadro de Mando Paciente',
          icon: null,
          url: '#',
          active: true,
          principal: false,
          children: [],
        },
        {
          id: 2,
          order: '1',
          title: 'Info. tratamientos',
          description: 'SecciÃ³n que contiene la Cuadro de Mando Paciente',
          icon: null,
          url: '#',
          active: true,
          principal: false,
          children: [],
        },
        {
          id: 3,
          order: '1',
          title: 'Info resultados de salud',
          description: 'SecciÃ³n que contiene la Cuadro de Mando Paciente',
          icon: null,
          url: '#',
          active: true,
          principal: false,
          children: [],
        },
        {
          id: 4,
          order: '1',
          title: 'Info pacientes/dosis',
          description: 'SecciÃ³n que contiene la Cuadro de Mando Paciente',
          icon: null,
          url: '#',
          active: true,
          principal: false,
          children: [],
        },
        {
          id: 5,
          order: '1',
          title: 'Info farmacoeconomicos',
          description: 'SecciÃ³n que contiene la Cuadro de Mando Paciente',
          icon: null,
          url: '#',
          active: true,
          principal: false,
          children: [],
        },
      ];
    }
  }
}
