import { Component, OnInit } from '@angular/core';
import { SideBarItemModel } from '../../models/side-bar/side-bar-item.model';
import { Router, NavigationEnd } from '@angular/router';
import { SideBarService } from '../../services/side-bar/side-bar.service';
import SectionActionBuilder from '../../utils/SectionActionsBuilder';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsService } from 'src/app/core/services/forms/forms.service';
import { ConfirmModalComponent } from 'src/app/core/components/modals/confirm-modal/confirm-modal.component';
import { SectionsService } from 'src/app/modules/management/services/sections/sections.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  public homeUrl = '/hopes';
  selectedSection: SideBarItemModel;
  crumbs: SideBarItemModel[];
  menu: Array<SideBarItemModel>;

  constructor(
    private _router: Router,
    private _sidebar: SideBarService,
    private _sectionsService: SectionsService,
    private _formService: FormsService,
    private _modalService: NgbModal
  ) {}

  ngOnInit() {
    this.menu = [JSON.parse(localStorage.getItem('completeMenu'))];
    this.receiveSection();
    this.listenRouter();
    if (this.menu[0] == null) {
      this._sectionsService
        .getSections()
        .subscribe((res) => this.getSectionById(res.id));
    } else {
      this.selectedSection = this.findSection(this.menu);
      if (this.selectedSection) {
        this.getSectionById(this.selectedSection.id);
      }
    }
  }

  findSection(menu: any) {
    return SectionActionBuilder.findSection('url', menu, this._router.url);
  }

  listenRouter() {
    this._router.events.subscribe((events: any) => {
      if (events instanceof NavigationEnd) {
        if (this.selectedSection) {
          this.getSectionById(this.selectedSection.id);
        }
      }
    });
  }

  receiveSection() {
    this._sidebar.event.subscribe((section: SideBarItemModel) => {
      this.selectedSection = section;
    });
  }

  navigate(section: any) {
    event.preventDefault();
    const url =
      section.url === this.homeUrl
        ? this.homeUrl
        : section.url.split('hopes')[1];
    if (this.checkConditionToNavigate(section)) {
      this._router.navigate([url]);
      this._sidebar.event.next(section);
    } else {
      if (url != this._router.url) {
        this.showModalConfirm(section);
      }
    }
  }

  private getSectionById(id: number): void {
    this._sectionsService.getSectionById(id).subscribe((response) => {
      localStorage.setItem('section', JSON.stringify(response));
      this._sidebar.event.next(response);
      this.crumbs = SectionActionBuilder.getCrumbs(response);
    });
  }
  checkConditionToNavigate(section: any): boolean {
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

  private showModalConfirm(section: any) {
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
      this.navigate(section);
    });
  }
}
