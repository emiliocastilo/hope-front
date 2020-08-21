import {
  Component,
  OnInit,
  Input,
  ComponentFactoryResolver,
  ViewContainerRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { Router } from '@angular/router';
import { SideBarService } from 'src/app/core/services/side-bar/side-bar.service';
import SectionActionBuilder from 'src/app/core/utils/SectionActionsBuilder';

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
  @Output() nav: EventEmitter<any> = new EventEmitter();
  public icons: any;

  constructor(
    private _sidebar: SideBarService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (!this.level) {
      this.level = this.LEVEL_ONE;
    }
    // this.getSelected();
  }

  getSelected() {
    const currentSelected = SectionActionBuilder.findSection(
      'url',
      this.menu,
      this._router.url
    );
    if (currentSelected) {
      this.selected = currentSelected;
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
    this.selected = section;
  }

  public toggleColapseMenu(menu: SideBarItemModel): void {
    menu.collapsed = !menu.collapsed;
  }
}
