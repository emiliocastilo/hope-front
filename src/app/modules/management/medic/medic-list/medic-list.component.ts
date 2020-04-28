import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicFormComponent } from 'src/app/core/components/dynamic-form/dynamic-form.component';
import { EditorModalComponent } from 'src/app/core/components/modals/editor-modal/editor-modal/editor-modal.component';
import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';
import { MedicModel } from '../../models/medic.model';
import { MedicModelToRowModelAdapter } from '../../adapters/medic-model-to-row-model.adapter';
import { MedicService } from '../../services/medic/medic.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RowDataModel } from 'src/app/core/models/table/row-data.model';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-medic-list',
  templateUrl: './medic-list.component.html',
  styleUrls: ['./medic-list.component.scss'],
})
export class MedicListComponent implements OnInit {
  public menuId: number = environment.MENU_ID.CONTROL_PANEL;

  @ViewChild('editModal') public editModal;

  modalForm: FormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    phone: ['', Validators.required],
    dni: ['', Validators.required],
    collegeNumber: ['', Validators.required],
    service: ['', Validators.required],
  });

  public isDetailModal = false;
  public isEditModal = false;
  public isNewModal = false;

  public columHeaders: Array<string> = [
    'Nombre',
    'Apellidos',
    'Dni',
    'Phone',
    'Código de Colegiado',
  ];
  public medics: Array<MedicModel> = [];
  public selectedItem: number;
  public isEditing: boolean = false;

  constructor(
    public translate: TranslateService,
    public _medicService: MedicService,
    private _toastr: ToastrService,
    private _formBuilder: FormBuilder,
    private _modalService: NgbModal,
    private _medicModelToRowModelAdapter: MedicModelToRowModelAdapter
  ) {}

  ngOnInit() {
    this._medicService.getAll().subscribe(
      (result) => {
        this.medics = result.content;
      },
      (error) => {
        this._toastr.error(`${error.status} ${error.statusText}`);
      }
    );
  }

  filter(data: any) {
    console.log('datos de buscador ' + data);
  }

  public prepareTableData(): Array<RowDataModel> {
    let rows = this.medics.map((patient) => {
      return this._medicModelToRowModelAdapter.adaptModelToRow(patient);
    });
    return rows;
  }

  public onSelectedItem(event: number): void {
    this.selectedItem = event;
  }

  public saveDoctors(): void {
    this.showModal();
  }

  public editDoctor(): void {
    if (this.selectedItem != undefined && this.selectedItem != null) {
      this.isEditing = true;
      this.modalForm.setValue({
        name: this.medics[this.selectedItem].name,
        surname: this.medics[this.selectedItem].surname,
        phone: this.medics[this.selectedItem].phone,
        dni: this.medics[this.selectedItem].dni,
        collegeNumber: this.medics[this.selectedItem].collegeNumber,
        service: this.medics[this.selectedItem].service,
      });
    }
    this.showModal();
  }

  private saveOrUpdate(event: any, modalRef: any): void {
    let formValues: JSON = event.value;
    let id;
    if (this.isEditing) {
      id = this.medics[this.selectedItem].id;
    }

    let doctor: MedicModel = new MedicModel(
      id,
      formValues['name'],
      formValues['surname'],
      formValues['phone'],
      formValues['dni'],
      formValues['collegeNumber'],
      formValues['hospitalId'],
      formValues['service']
    );
    if (this.isEditing) {
      this._medicService.updateDoctor(doctor).subscribe((response) => {
        this.isEditing = false;
        modalRef.close();
        this.refreshData();
      });
    } else {
      this._medicService.postDoctor(doctor).subscribe((response) => {
        this.modalForm.reset();
        modalRef.close();
        this.refreshData();
      });
    }
  }

  private showModal() {
    let modalRef = this._modalService.open(EditorModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.id = 'doctoreditor';
    modalRef.componentInstance.title = 'Medico';
    modalRef.componentInstance.form = this.modalForm;
    modalRef.componentInstance.close.subscribe((event) => {
      modalRef.close();
    });
    modalRef.componentInstance.save.subscribe((event) => {
      this.saveOrUpdate(event, modalRef);
    });
  }

  private refreshData(): void {
    this.modalForm.reset();
    this._medicService.getAll().subscribe((data) => {
      this.medics = data.content;
    });
  }

  public deleteDoctor(): void {
    this._medicService
      .deleteDoctor(this.medics[this.selectedItem].id)
      .subscribe((response) => {
        this._toastr.success('El doctor se ha borrado correctamente');
      });
  }

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  // Pensado para validar previamente por si tenemos datos de BD y settearlos
  ngAfterViewInit() {
    let previousValid = this.form.valid;
    this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        this.form.setDisabled('submit', !previousValid);
      }
    });

    this.form.setDisabled('submit', true);
    //Para setearlos
    //this.form.setValue('name', 'Todd Motto');
  }

  // Json con Array de campos de form
  config: FieldConfig[] = [
    {
      type: 'input',
      label: 'Nombre',
      name: 'name',
      placeholder: 'nombre',
      validation: [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(6),
      ],
    },
    {
      type: 'select',
      label: 'Comida',
      name: 'food',
      options: ['Pizza', 'Churrasco', 'Cofe', 'Postre'],
      placeholder: 'Selecciones',
      validation: [Validators.required],
    },
    {
      type: 'checkbox',
      label: 'Recordarme',
      name: 'rememberme',
      validation: [Validators.required],
    },
    {
      type: 'radio',
      label: 'radiobutton',
      name: 'radiobutton',
      disabled: false,
    },
    {
      label: 'Submit',
      name: 'submit',
      type: 'button',
      disabled: true,
    },
  ];

  //Registrar el submit del Form
  submit(value: { [name: string]: any }) {
    console.log(value);
  }
}
