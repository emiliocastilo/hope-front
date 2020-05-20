import { Component, OnInit } from '@angular/core';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { TranslateService } from '@ngx-translate/core';
import { RowDataModel } from 'src/app/core/models/table/row-data.model';
import { ColumnDataModel } from 'src/app/core/models/table/colum-data.model';

@Component({
  selector: 'app-cie9',
  templateUrl: './cie9.component.html',
  styleUrls: ['./cie9.component.scss'],
})
export class Cie9Component implements OnInit {
  public menu: SideBarItemModel[] = [];
  public menuSelected: SideBarItemModel;
  data = [
    { name: 'hola', value: 2 },
    { name: 'adios', value: 6 },
  ];
  public columHeaders = ['cie9Diagnostic', 'patients'];
  public array = [
    { cie9Diagnostic: 'hola', patients: 2 },
    { cie9Diagnostic: 'adios', patients: 6 },
  ];

  constructor(private _translate: TranslateService) {}

  ngOnInit(): void {
    this.menu = JSON.parse(localStorage.getItem('menu')).filter((item) =>
      item.url.endsWith('/dashboard')
    );
    this.menuSelected = this.menu[0].children.find((item) =>
      item.url.endsWith('/dashboard/diagnostic')
    );
  }
}
