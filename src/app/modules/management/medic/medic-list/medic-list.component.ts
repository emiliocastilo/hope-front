import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MedicService } from '../../services/medic/medic.service';
import { ToastrService } from 'ngx-toastr';
import { RowDataModel } from 'src/app/core/models/table/row-data.model';
import { MedicModel } from '../../models/medic.model';
import { MedicModelToRowModelAdapter } from '../../adapters/medic-model-to-row-model.adapter';

@Component({
  selector: 'app-medic-list',
  templateUrl: './medic-list.component.html',
  styleUrls: ['./medic-list.component.sass']
})
export class MedicListComponent implements OnInit {
  // public medicListForm = new FormGroup({
  //   searcherForm: new FormControl()
  // });

  @ViewChild('editModal') public editModal;

  modalForm: FormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    phone: ['', Validators.required],
    dni: ['', Validators.required],
    collegeNumber: ['', Validators.required],
    active: [Boolean, Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', Validators.required]
  });

  public elementoSeleccionado: any = null;
  public isDetailModal = false;
  public isEditModal = false;
  public isNewModal = false;

  public COLUMNS_HEADER: Array<string> = ['Nombre', 'Apellidos'
    , 'Dni', 'Phone', 'Código de Colegiado'];
  public medics: Array<MedicModel>;
  public selectedItem: number = 0;

  constructor(
    public translate: TranslateService,
    public medicService: MedicService,
    private _toastr: ToastrService,
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private _medicModelToRowModelAdapter: MedicModelToRowModelAdapter
  ) { }

  public medic = {
    name: "Prueba",
    surname: "",
    phone: "",
    dni: "",
    collegeNumber: "",
    active: "",
    username: "",
    password: "",
    email: "",
  }

  ngOnInit() {
    this.medics = [new MedicModel(
      "medico1",
      "Apellidos",
      "321654987",
      "132456798D",
      "98787879897879"
    )];
    this.medicService.getAll().subscribe(result => {
      //this.medics= result.content;
    },
      error => {
        this._toastr.error(error.status + " " + error.statusText);
      });
  }

  filter(data: any) {
    console.log("datos de buscador " + data);
  }

  public prepareTableData(): Array<RowDataModel> {
    let rows = this.medics.map(
      (patient) => {
        return this._medicModelToRowModelAdapter.adaptModelToRow(patient);
      }
    );
    rows.push(rows[0]);
    rows.push(rows[0]);
    rows.push(rows[0]);
    rows.push(rows[0]);
    rows.push(rows[0]);
    return rows;
  }

  public onSelectedItem(event: number): void {
    this.selectedItem = event;
  }

  showModal(data: any) {

    this.isNewModal = data.isNew;
    this.isEditModal = data.isEdit;
    this.isDetailModal = data.isDetail;

    const modalRef = this.modalService.open(data.modal);

    modalRef.result.then((result) => {
      console.log(result);
      debugger
      this.medicService.postDoctor(result).subscribe(result => {
        debugger
      },
        error => {
          this._toastr.error(error.status + " " + error.statusText);
        });
    }).catch((error) => {
      console.log("ERROR modal" + error);
    });
  }


}
