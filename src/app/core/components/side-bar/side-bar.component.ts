import {
  Component,
  OnInit,
  Input,
  ComponentFactoryResolver,
  ViewContainerRef,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SideBarItemModel } from '../../models/side-bar/side-bar-item.model';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  @Input() menu: Array<SideBarItemModel>;
  @Input() currentMenuId: number;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // this.activatedRoute.data.subscribe((response) => {
    //   this.menu = this.showSideBar(response.menu.children);
    // });
  }

  showSideBar(menuArray: SideBarItemModel[]): SideBarItemModel[] {
    const rootMenu = menuArray.filter(
      (value: SideBarItemModel) => value.id === this.currentMenuId
    );
    return rootMenu;
  }
}
