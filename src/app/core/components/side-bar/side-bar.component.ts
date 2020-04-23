import { Component, OnInit, Input, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SideBarItemModel } from '../../models/side-bar/side-bar-item.model';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.sass']
})
export class SideBarComponent implements OnInit {
  public menu:Array<SideBarItemModel>;
  @Input() currentMenuId: number;

  constructor(private activatedRoute: ActivatedRoute) { }

  showSideBar(menuArray: SideBarItemModel[]): SideBarItemModel[] {
    console.log(this.currentMenuId);
    const rootMenu = menuArray.filter((value: SideBarItemModel) => (value.id === this.currentMenuId));
    return rootMenu; 
  }

  ngOnInit(): void {

    this.activatedRoute.data.subscribe(
      response => {
        this.menu = this.showSideBar(response.menu.children);
      }
    );
  }

}
