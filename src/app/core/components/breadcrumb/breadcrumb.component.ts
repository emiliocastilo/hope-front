import { Component, OnInit, Input } from '@angular/core';
import { SideBarItemModel } from '../../models/side-bar/side-bar-item.model';
import { Router } from '@angular/router';
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

  constructor(
    private _router: Router,
    private _sidebar: SideBarService,
    private _sectionsService: SectionsService
  ) {}

  ngOnInit(): void {
    this.receiveSection();
    this._router.events.subscribe((events: any) => {
      const actualUrl = `/hopes${events.urlAfterRedirects}`;
      if (this.selectedSection && actualUrl === this.selectedSection.url) {
        this.getSectionById(this.selectedSection.id);
      }
    });
  }

  receiveSection() {
    this._sidebar.event.subscribe(
      (section: SideBarItemModel) => (this.selectedSection = section)
    );
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
      this.crumbs = SectionActionBuilder.getCrumbs(response);
    });
  }
}
