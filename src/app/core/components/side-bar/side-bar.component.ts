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

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      response => {
        debugger
        this.menu = response.menu;
      }
    );
  }

}
