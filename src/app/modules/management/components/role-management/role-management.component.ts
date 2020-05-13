import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/core/services/role/role.service';
import { RoleManagementService } from '../../services/role-management.service';
import { RowDataModel } from 'src/app/core/models/table/row-data.model';
import { RolModel } from '../../models/rol.model';
import { ColumnDataModel } from 'src/app/core/models/table/colum-data.model';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss'],
})
export class RoleManagementComponent implements OnInit {
  public roles: Array<RolModel>;
  public tableHeaders: Array<string> = ['Nombre', 'Descripción'];
  public tableData: Array<RowDataModel>;

  constructor(private _roleManagementService: RoleManagementService) {}

  ngOnInit(): void {
    this._roleManagementService.getRoles().subscribe((data) => {
      this.roles = data;
      this.tableData = this.prepareTableData(data);
    });
  }

  private prepareTableData(roles: Array<RolModel>): Array<RowDataModel> {
    return roles.map((rol) => {
      let row: RowDataModel = new RowDataModel();
      row.pushColumn(new ColumnDataModel('text', rol.name));
      row.pushColumn(new ColumnDataModel('text', rol.description));
      return row;
    });
  }
}
