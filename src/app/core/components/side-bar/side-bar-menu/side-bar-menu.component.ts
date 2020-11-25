import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { Router } from '@angular/router';
import { SideBarService } from 'src/app/core/services/side-bar/side-bar.service';
import { Subscription } from 'rxjs';
import SectionActionBuilder from 'src/app/core/utils/SectionActionsBuilder';

@Component({
  selector: 'side-bar-menu',
  templateUrl: './side-bar-menu.component.html',
  styleUrls: ['./side-bar-menu.component.scss'],
})
export class SideBarMenuComponent implements OnInit, OnDestroy {
  private currentSectionSubscription: Subscription;
  private sectionSecuence: Array<SideBarItemModel>;

  public LEVEL_ONE = 1;
  public icons: any;
  public ICONS = {
    Administración: 'settings',
    'Cuadro de Mando': 'bar-chart-2',
    Calendario: 'calendar',
    Alertas: 'bell',
    Paciente: 'users',
    Soporte: 'mail',
  };

  currentSection: SideBarItemModel;

  @Input() parentSection: SideBarItemModel;
  @Input() menu: Array<SideBarItemModel>;
  @Input() level: number;
  @Input() collapsed: boolean;

  constructor(private _sidebar: SideBarService, private _router: Router) {}

  ngOnInit(): void {
    this.currentSection = JSON.parse(localStorage.getItem('section'));
    this.sectionSecuence = SectionActionBuilder.getCrumbs(this.currentSection);
    this.sectionSecuence.shift();

    // console.log('INITIAL SECTION :: ', this.currentSection.title, this.sectionSecuence);
    // console.log('Nivel', this.level, this.sectionSecuence[this.level - 1]);

    this.sectionSecuence.forEach((element) => {});

    this.currentSectionSubscription = this._sidebar
      .getCurrentSection()
      .subscribe((section: SideBarItemModel) => {
        this.currentSection = section;
        this.updateCollapseState(this.menu);
        // this.checkCollapsedSection(section);
      });

    setTimeout(() => {
      if (this.menu) {
        // console.log('menu', this.menu);
        // console.log('level', this.level);
        this.assingParents();
        // console.log(this.menu);
        // this.checkCollapsedSection(this.currentSection);
        this.updateCollapseState(this.menu);
      }
    }, 500);
    if (!this.level) {
      this.level = this.LEVEL_ONE;
    }
  }

  goUrl(section: SideBarItemModel) {
    this._sidebar.currentSection.next(section);
    event.preventDefault();
    // if (section.children.length) {
    //     this.toggleColapseMenu(section);
    // }
    const url = section.url.split('hopes')[1];
    if (url) {
      this._router.navigate([url]);
    }
    // this.currentSection = section;
    // this._sidebar.currentSection.next(section);
    this.updateCollapseState(this.menu);
  }

  public toggleColapseMenu(menuItem: SideBarItemModel): void {
    menuItem.collapsed = !menuItem.collapsed;
  }

  checkCollapsedSection(section: SideBarItemModel) {
    if (section && section.fatherSection !== null) {
      this.checkCollapsedSection(section.fatherSection);
      this.activateCollapse(this.menu, section.id);
    }
  }

  activateCollapse(array: any, id: number) {
    array.some((o: SideBarItemModel) => {
      o.id === id
        ? (o.collapsed = true)
        : this.activateCollapse(o.children || [], id);
    });
  }

  updateCollapseState(menu: Array<SideBarItemModel>) {
    if (this.currentSection && menu) {
      // menu.forEach(item => {
      //     item.collapsed = true;
      //     // * El id del elemento es el de la sección seleccionada
      //     if (item.id === this.currentSection.id) {
      //         // console.log('ITEM SELECCIONADO', item.title);
      //         item.collapsed = false;
      //         item.selected = true;

      //         // * El elemento no es el seleccionado y tiene hijos
      //     } else if (item.children && item.children.length > 0) {

      //         // * Si uno de sus hijos es el elemento seleccionado
      //         if (item.children.find(f => f.id === this.currentSection.id)) {
      //             item.collapsed = false;
      //         } else {
      //             // console.log(`RECURSIVA de ${item.title}`, item.children);
      //             this.updateCollapseState(item.children);
      //         }
      //     } else item.collapsed = true;
      //     console.log(`${item.title} -> ${item.collapsed ? 'CERRADO' : 'ABIERTO'}`);
      //     // debugger
      // });

      menu.forEach((item) => {
        if (this.sectionSecuence[this.level - 1]) {
          item.collapsed =
            item.id === this.sectionSecuence[this.level - 1].id ? false : true;
          if (!item.collapsed && item.children && item.children.length > 0) {
            this.updateCollapseState(item.children);
          } else item.collapsed = true;
        } else item.collapsed = true;
        console.log(
          `${item.title} :: ${
            this.sectionSecuence[this.level - 1].title
          } ::::: ${item.collapsed}`
        );
      });
    }
  }

  assingParents() {
    this.menu.forEach((rootItem) => {
      if (this.parentSection) rootItem.fatherSection = this.parentSection;
    });
  }

  ngOnDestroy() {
    this.currentSectionSubscription.unsubscribe();
  }
}
