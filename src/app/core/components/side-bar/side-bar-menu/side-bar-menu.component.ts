import { Component, OnInit, Input, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';

@Component({
  selector: 'side-bar-menu',
  templateUrl: './side-bar-menu.component.html',
  styleUrls: ['./side-bar-menu.component.sass']
})
export class SideBarMenuComponent implements OnInit {
  public LEVEL_ONE:number = 1;

  @Input() menu:Array<SideBarItemModel>;
  @Input() level:number;

  constructor(private componentFactoryResolver:ComponentFactoryResolver,
      private viewContainerRef:ViewContainerRef) { }

  ngOnInit(): void {
    if(!this.level){
      this.level = this.LEVEL_ONE;
    }
  }

}
