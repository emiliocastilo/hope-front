import { Component, OnInit } from '@angular/core';
import { RowDataModel } from 'src/app/core/models/table/row-data.model';
import { SectionModel } from '../../models/section.model';
import { SectionsService } from '../../services/sections/sections.service';
import { ColumnDataModel } from 'src/app/core/models/table/colum-data.model';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { ColumnHeaderModel } from 'src/app/core/models/table/colum-header.model';
import { SECTIONS_TABLE_HEADERS } from 'src/app/modules/management/constants/sections.constants';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
})
export class SectionsComponent implements OnInit {
  public sections: Array<SectionModel>;
  public menu: SideBarItemModel[] = [];
  public menuSelected: SideBarItemModel;
  public tableHeaders: Array<ColumnHeaderModel> = SECTIONS_TABLE_HEADERS;
  public tableData: Array<RowDataModel>;

  constructor(private sectionsService: SectionsService) {}

  ngOnInit(): void {
    // Carga menú lateral
    this.menu = JSON.parse(localStorage.getItem('menu')).filter((item) =>
      item.url.endsWith('/management')
    );
    this.menuSelected = this.menu[0].children.find((item) =>
      item.url.endsWith('/management/sections')
    );
    // fin carga menú lateral
    this.sectionsService.getSections().subscribe((data) => {
      this.sections = data.children;
      this.tableData = this.prepareTableData(data.children);
    });
  }

  private prepareTableData(sections: Array<SectionModel>): Array<RowDataModel> {
    return sections.map((section) => {
      const row: RowDataModel = new RowDataModel();
      row.pushColumn(new ColumnDataModel('text', section.title));
      row.pushColumn(new ColumnDataModel('text', section.description));
      return row;
    });
  }
}
