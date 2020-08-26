import { Component, OnInit } from '@angular/core';
import { SideBarItemModel } from '../../models/side-bar/side-bar-item.model';
import { Router, NavigationEnd } from '@angular/router';
import { SideBarService } from '../../services/side-bar/side-bar.service';
import SectionActionBuilder from '../../utils/SectionActionsBuilder';
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
    private _sectionsService: SectionsService
  ) {}

  ngOnInit() {
    this.menu = [JSON.parse(localStorage.getItem('completeMenu'))];
    this.receiveSection();
    this.listenRouter();
    this.selectedSection = this.findSection(this.menu);
    if (this.selectedSection) {
      this.getSectionById(this.selectedSection.id);
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
    this._router.navigate([url]);
    this._sidebar.event.next(section);
  }

  private getSectionById(id: number): void {
    this._sectionsService.getSectionById(id).subscribe((response) => {
      localStorage.setItem('section', JSON.stringify(response));
      this._sidebar.event.next(response);
      this.crumbs = SectionActionBuilder.getCrumbs(response);
    });
  }
}
