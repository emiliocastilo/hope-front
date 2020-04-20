import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MedicService } from '../../services/medic/medic.service';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from 'src/app/core/components/modal/modal.component';
import { INFO_MODAL_CONSTANT } from './INFO_MODAL_CONSTANT';
import { RowDataModel } from 'src/app/core/models/table/row-data.model';
import { MedicModel } from '../../models/medic.model';
import { MedicModelToRowModelAdapter } from '../../adapters/medic-model-to-row-model.adapter';

@Component({
  selector: 'app-medic-list',
  templateUrl: './medic-list.component.html',
  styleUrls: ['./medic-list.component.sass']
})
export class MedicListComponent implements OnInit {
  public medicListForm = new FormGroup({
    searcherForm: new FormControl()
  });

  @ViewChild('infoModal') public infoModal;
  @ViewChild('editModal') public editModal;
  @ViewChild("editModal", { static: false }) myModalInfo: TemplateRef<any>;


  modalForm: FormGroup;

  public elementoSeleccionado: any = null;
  public show = true;
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
    this.modalForm = this._formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      // phone: ['', Validators.required],
      // dni: ['', Validators.required],
      // collegeNumber: ['', Validators.required],
      // active: [Boolean, Validators.required],
      // username: ['', Validators.required],
      // password: ['', Validators.required],
      // email: ['', Validators.required]
    });

    this.medicService.getAll().subscribe(result => {

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

    const modalRef = this.modalService.open(ModalComponent);

    modalRef.componentInstance.dataModal = this.medic;
    modalRef.componentInstance.title = "prueba";
    modalRef.componentInstance.modalData = INFO_MODAL_CONSTANT.STOP_EDITING_MODAL_DATA;
    modalRef.componentInstance.emitInfo
      .subscribe({ next: this._confirmToStop });
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });

  }
  private _confirmToStop = (response: { opStatus: string }) => {
    if (response.opStatus.toLowerCase() === 'confirmed') {
      // do operation
      console.log('Perform operation here!');
    }
  }
}
