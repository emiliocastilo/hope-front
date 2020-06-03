import { Component, OnInit, Input } from '@angular/core';
import { SideBarItemModel } from '../../models/side-bar/side-bar-item.model';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  @Input() crumbs: SideBarItemModel[];

  public homeUrl: string = '/hopes';

  constructor() {}

  ngOnInit(): void {}
}
