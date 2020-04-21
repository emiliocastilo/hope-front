import { Component, OnInit } from '@angular/core';
import { RowDataModel } from 'src/app/core/models/table/row-data.model';
import { PatientsService } from '../../services/patients.service';
import { PatientModel } from '../../models/patient.model';
import { PatientModelToRowModelAdapter } from '../../adapters/patient-model-to-row-model.adapter';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.sass']
})
export class PatientsListComponent implements OnInit {
  public COLUMNS_HEADER:Array<string> = ['Patient Name', 'Nhc'
    , 'Health Card', 'Dni', 'Phone', 'Gender Code', 'Pathologies'];
  public patients:Array<PatientModel>;
  public selectedItem:number;

  constructor(private _patientsService:PatientsService,
    private _patientModelToRowModelAdapter: PatientModelToRowModelAdapter,
    private _toastr: ToastrService) { }

  ngOnInit(): void {
    this._patientsService.getPatients().subscribe(
      (data) => {
        this.patients = data;
      }
    );
  }

  public prepareTableData():Array<RowDataModel>{
    let rows = this.patients.map(
      (patient) => {
        return this._patientModelToRowModelAdapter.adaptModelToRow(patient);
      }
    );
    return rows;
  }

  public onSelectedItem(event:number):void {
    this.selectedItem = event;
  }

  public onFilter(event:string): void{
    this._patientsService.getPatientsById(event).subscribe(
      (data) => {
        this.patients = Array<PatientModel>();
        this.patients.push(data);
      }
    );
  }

  public deletePatient(): void{
    this._patientsService
      .deletePatient(this.patients[this.selectedItem].id).subscribe(
        (response) => {
          debugger
          this._toastr.success("El paciente se ha borrado correctamente")}
      );
  }

}
