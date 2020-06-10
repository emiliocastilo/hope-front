import { Component, OnInit, Input } from '@angular/core';
import { SideBarItemModel } from '../../models/side-bar/side-bar-item.model';
import { Router } from '@angular/router';
import { SideBarService } from '../../services/side-bar/side-bar.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  @Input() crumbs: SideBarItemModel[];

  public homeUrl: string = '/hopes';

  constructor(private _router: Router, private _sidebar: SideBarService) {}

  ngOnInit(): void {}

  navigate(section: any) {
    event.preventDefault();
    const url =
      section.url === this.homeUrl
        ? this.homeUrl
        : section.url.split('hopes')[1];
    this._router.navigate([url]);
    this._sidebar.event.next(section);
  }
}
