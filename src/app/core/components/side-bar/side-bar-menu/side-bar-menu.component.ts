import { Component, OnInit, Input } from '@angular/core';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { Router } from '@angular/router';
import { SideBarService } from 'src/app/core/services/side-bar/side-bar.service';

@Component({
  selector: 'side-bar-menu',
  templateUrl: './side-bar-menu.component.html',
  styleUrls: ['./side-bar-menu.component.scss'],
})
export class SideBarMenuComponent implements OnInit {
  public LEVEL_ONE = 1;
  public ICONS = {
    Administración: 'settings',
    'Cuadro de Mando': 'bar-chart-2',
    Calendario: 'calendar',
    Alertas: 'bell',
    Paciente: 'users',
    Soporte: 'mail',
  };

  @Input() menu: Array<SideBarItemModel>;
  selected: SideBarItemModel;
  @Input() level: number;
  @Input() collapsed: boolean;
  public icons: any;

  constructor(private _sidebar: SideBarService, private _router: Router) {}

  ngOnInit(): void {
    this.selected = JSON.parse(localStorage.getItem('section'));
    setTimeout(() => {
      if (this.menu) {
        this.checkCollapsedSection(this.selected);
      }
    }, 500);
    if (!this.level) {
      this.level = this.LEVEL_ONE;
    }
  }

  goUrl(section: SideBarItemModel) {
    event.preventDefault();
    if (section.children.length) {
      this.toggleColapseMenu(section);
    }
    const url = section.url.split('hopes')[1];
    if (url) {
      this._router.navigate([url]);
    }
    this.checkCollapsedSection(section);
    this._sidebar.event.next(section);
  }

  public toggleColapseMenu(menu: SideBarItemModel): void {
    menu.collapsed = !menu.collapsed;
  }

  checkCollapsedSection(section: SideBarItemModel) {
    if (section && section.fatherSection !== null) {
      this.checkCollapsedSection(section.fatherSection);
    }
    this.activateCollapse(this.menu, section.id);
  }

  activateCollapse(array: any, id: number) {
    array.some((o) =>
      o.id === id
        ? (o.collapsed = true)
        : this.activateCollapse(o.children || [], id)
    );
  }
}
