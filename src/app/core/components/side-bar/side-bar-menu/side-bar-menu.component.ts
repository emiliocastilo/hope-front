import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { Router, NavigationEnd } from '@angular/router';
import { SideBarService } from 'src/app/core/services/side-bar/side-bar.service';
import { FormsService } from 'src/app/core/services/forms/forms.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from 'src/app/core/components/modals/confirm-modal/confirm-modal.component';

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
  @Output() sectionChange: EventEmitter<any> = new EventEmitter<any>();
  private navigationCancel: boolean;

  constructor(
    private _sidebar: SideBarService,
    private _formService: FormsService,
    private _modalService: NgbModal,
    private _router: Router
  ) {}

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
    if (url && this.checkConditionToNavigate()) {
      this._router.navigate([url]);
    } else {
      if (url && url != this._router.url) {
        this.showModalConfirm();
      }
    }
    this.selected = section;
    this._sidebar.event.next(section);
    this.listenSection();
  }

  checkConditionToNavigate(): boolean {
    if (this._formService.getMustBeSaved()) {
      if (this._formService.getSavedForm()) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  listenSection() {
    this._sidebar.event.subscribe((s: any) => {
      this.checkCollapsedSection(s);
    });
  }

  public toggleColapseMenu(menu: SideBarItemModel): void {
    menu.collapsed = !menu.collapsed;
  }

  checkCollapsedSection(section: SideBarItemModel) {
    if (section && section.fatherSection !== null) {
      this.checkCollapsedSection(section.fatherSection);
      this.activateCollapse(this.menu, section.id);
    }
  }

  activateCollapse(array: any, id: number) {
    array.some((o) =>
      o.id === id
        ? (o.collapsed = true)
        : this.activateCollapse(o.children || [], id)
    );
  }
  getUnsavedChanges() {
    this.navigationCancel = true;
  }

  private showModalConfirm() {
    const modalRef = this._modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = 'Aviso de cambios';
    modalRef.componentInstance.messageModal =
      'Hay cambios sin guardar, ¿Continuar?';
    modalRef.componentInstance.cancel.subscribe((event) => {
      modalRef.close();
      this._formService.setSavedForm(false);
    });
    modalRef.componentInstance.accept.subscribe((event) => {
      modalRef.close();
      this._formService.setSavedForm(true);
      this.goUrl(this.selected);
    });
  }
}
