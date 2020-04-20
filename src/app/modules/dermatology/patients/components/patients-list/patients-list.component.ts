import { Component, OnInit } from '@angular/core';
import { RowDataModel } from 'src/app/core/models/table/row-data.model';
import { PatientsService } from '../../services/patients.service';
import { PatientModel } from '../../models/patient.model';
import { PatientModelToRowModelAdapter } from '../../adapters/patient-model-to-row-model.adapter';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.sass']
})
export class PatientsListComponent implements OnInit {
  public COLUMNS_HEADER:Array<string> = ['Patient Name', 'Nhc'
    , 'Health Card', 'Dni', 'Phone', 'Gender Code', 'Pathologies'];
  public patients:Array<PatientModel>;
  public selectedItem:number = 0;

  constructor(private _patientsService:PatientsService,
    private _patientModelToRowModelAdapter: PatientModelToRowModelAdapter) { }

  ngOnInit(): void {
    this._patientsService.getPatients().subscribe(
      (data) => {
        this.patients = data;
      }
    );
  }

  public prepareTableData():Array<RowDataModel>{
    debugger
    let rows = this.patients.map(
      (patient) => {
        return this._patientModelToRowModelAdapter.adaptModelToRow(patient);
      }
    );
    rows.push(rows[0]);
    rows.push(rows[0]);
    rows.push(rows[0]);
    rows.push(rows[0]);
    rows.push(rows[0]);
    return rows;
  }

  public onSelectedItem(event:number):void {
    debugger
    this.selectedItem = event;
  }

  public onFilter(event:string): void{

  }

}
