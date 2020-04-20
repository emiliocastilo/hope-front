import { Component, OnInit } from '@angular/core';
import { RowDataModel } from 'src/app/core/models/table/row-data.model';
import { PatientsService } from '../../services/patients.service';
import { PatientModel } from '../../models/patient.model';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.sass']
})
export class PatientsListComponent implements OnInit {
  public COLUMNS_HEADER:Array<string> = ['Id', 'Name', 'First Name', 'Last Surname', 'Nhc'
    , 'Health Card', 'Dni', 'Address', 'Phone', 'Email', 'Birth Date', 'Hospital'
    , 'Gender Code', 'Pathologies'];
  public patients:Array<PatientModel>;

  constructor(private _patientsService:PatientsService) { }

  ngOnInit(): void {
    this._patientsService.getPatients().subscribe(
      (data) => {this.patients = data}
    );
  }

  public prepareData():Array<RowDataModel>{
    let rows:Array<RowDataModel> = new Array<RowDataModel>();
    let row:RowDataModel = new RowDataModel();
    row.pushColumn('1');
    row.pushColumn('Jorge');
    row.pushColumn('Sanchez');
    row.pushColumn('Ferreiro');
    row.pushColumn('Nhc');
    row.pushColumn('0000000001');
    row.pushColumn('70000000k');
    row.pushColumn('Test');
    row.pushColumn('000000000');
    row.pushColumn('test@test.com');
    row.pushColumn('27/12/2020');
    row.pushColumn('Santiago');
    row.pushColumn('Male');
    row.pushColumn('Pathologies');
    rows.push(row);
    return rows;
  }

}
