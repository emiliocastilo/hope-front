import { Component, OnInit, Input } from '@angular/core';
import { SideBarItemModel } from '../../models/side-bar/side-bar-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  @Input() crumbs: SideBarItemModel[];

  public homeUrl: string = '/hopes';

  constructor(private _router: Router) {}

  ngOnInit(): void {}

  navigate(link: string) {
    event.preventDefault();
    const url = link === this.homeUrl ? link : link.split('hopes')[1];
    this._router.navigate([url]);
  }
}
