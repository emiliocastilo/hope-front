import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PatientModel } from '../../models/patient.model';
import { PatientModelToRowModelAdapter } from '../../adapters/patient-model-to-row-model.adapter';
import { PatientsService } from '../../services/patients.service';
import { RowDataModel } from 'src/app/core/models/table/row-data.model';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

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
  public menu:Array<SideBarItemModel>;
  modalForm: FormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    nhc: ['', Validators.required],
    healthCard: ['', Validators.required],
    dni: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
    genderCode: ['', Validators.required],
    birthDate: ['', Validators.required]
  });

  public menuId: number = environment.MENU_ID.PATIENTS;

  constructor(private _patientsService:PatientsService,
    private _patientModelToRowModelAdapter: PatientModelToRowModelAdapter,
    private _toastr: ToastrService,
    private _formBuilder: FormBuilder,
    private _modalService: NgbModal) { }

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
          this._toastr.success('El paciente se ha borrado correctamente')}
      );
  }

  showModal(data: any) {
    const modalRef = this._modalService.open(data.modal);

    modalRef.result.then((result) => {
      /*console.log(result);
      this.medicService.postDoctor(result).subscribe(result => {
      },
        error => {
          this._toastr.error(error.status + " " + error.statusText);
        });*/
    }).catch((error) => {
      console.log(`ERROR modal ${error}`);
    });
  }

}
