import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicFormComponent } from 'src/app/core/components/dynamic-form/dynamic-form.component';
import { EditorModalComponent } from 'src/app/core/components/modals/editor-modal/editor-modal/editor-modal.component';
import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';
import { Validators } from '@angular/forms';
import { MedicModel } from 'src/app/core/models/medic/medic.model';
import { MedicModelToRowModelAdapter } from '../../adapters/medic-model-to-row-model.adapter';
import { MedicService } from 'src/app/core/services/medic/medic.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RowDataModel } from 'src/app/core/models/table/row-data.model';
import { ServiceModel } from 'src/app/core/models/service/service.model';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { HospitalModel } from 'src/app/core/models/hospital/hospital.model';

@Component({
  selector: 'app-medic-list',
  templateUrl: './medic-list.component.html',
  styleUrls: ['./medic-list.component.scss'],
})
export class MedicListComponent implements OnInit {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  constructor(
    private _medicModelToRowModelAdapter: MedicModelToRowModelAdapter,
    private _modalService: NgbModal,
    private _toastr: ToastrService,
    public _medicService: MedicService,
    public translate: TranslateService,
    private _activatedRoute: ActivatedRoute
  ) {}

  public formConfig: FieldConfig[] = [];
  public columHeaders: string[] = [
    'Nombre',
    'Apellidos',
    'Dni',
    'Phone',
    'Código de Colegiado',
  ];
  public hospitals: HospitalModel[] = [];
  public isDetailModal = false;
  public isEditModal = false;
  public isEditing: boolean = false;
  public isNewModal = false;
  public medics: MedicModel[] = [];
  public menuId: number = environment.MENU_ID.CONTROL_PANEL;
  public selectedItem: number;
  public services: ServiceModel[] = [];

  ngOnInit() {
    this.services = this._activatedRoute.snapshot.data.services;
    this.hospitals = this._activatedRoute.snapshot.data.hospitals;
    this.medics = this._activatedRoute.snapshot.data.medics.content;
    this.formConfig = [
      {
        type: 'input',
        label: 'modal.editor.field.name',
        name: 'name',
        placeholder: 'modal.editor.field.name',
        validation: [Validators.required, Validators.minLength(2)],
      },
      {
        type: 'input',
        label: 'modal.editor.field.surname',
        name: 'surname',
        placeholder: 'modal.editor.field.surname',
        validation: [Validators.required, Validators.minLength(1)],
      },
      {
        type: 'input',
        label: 'modal.editor.field.phone',
        name: 'phone',
        placeholder: 'modal.editor.field.phone',
        validation: [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(9),
        ],
      },
      {
        type: 'input',
        label: 'modal.editor.field.collegeNumber',
        name: 'collegeNumber',
        placeholder: 'modal.editor.field.collegeNumber',
        validation: [Validators.required],
      },
      {
        type: 'input',
        label: 'modal.editor.field.dni',
        name: 'dni',
        placeholder: 'modal.editor.field.dni',
        validation: [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(6),
        ],
      },
      {
        type: 'input',
        label: 'modal.editor.field.username',
        name: 'username',
        placeholder: 'modal.editor.field.username',
        validation: [Validators.required],
      },
      {
        type: 'input',
        label: 'modal.editor.field.password',
        name: 'password',
        placeholder: 'modal.editor.field.password',
        validation: [Validators.required],
      },
      {
        type: 'input',
        label: 'modal.editor.field.email',
        name: 'email',
        placeholder: 'modal.editor.field.email',
        validation: [Validators.required],
      },
      {
        type: 'select',
        label: 'modal.editor.field.service',
        name: 'service',
        placeholder: 'modal.editor.field.service',
        options: this.services,
        validation: [Validators.required],
      },
      {
        type: 'select',
        label: 'modal.editor.field.hospital',
        name: 'hospitals',
        placeholder: 'modal.editor.field.hospital',
        options: this.hospitals,
        validation: [Validators.required],
      },
      {
        label: 'btn.save',
        name: 'btn.save',
        type: 'button',
        disabled: false,
      },
    ];
  }

  filter(data: any) {
    console.log('datos de buscador ' + data);
  }

  public prepareTableData(): Array<RowDataModel> {
    const rows = this.medics.map((doctor) => {
      return this._medicModelToRowModelAdapter.adaptModelToRow(doctor);
    });
    return rows;
  }

  public onSelectedItem(event: number): void {
    this.selectedItem = event;
    const selectedDoctor = new MedicModel();

    selectedDoctor.setValuesFromObject(this.medics[event]);

    Object.keys(selectedDoctor).map((doctorKey: string) => {
      this.formConfig.map((valueFrom: any, keyform: number) => {
        if (valueFrom.name === doctorKey) {
          this.formConfig[keyform].value = selectedDoctor[doctorKey];
        }
      });
    });
  }

  public saveDoctor(): void {
    this.formConfig.map((valueFrom: any, keyform: number) => {
      this.formConfig[keyform].value = null;
    });
    this.isEditing = false;
    this.selectedItem = null;
    this.showModal();
  }

  public editDoctor(): void {
    this.isEditing = true;
    this.showModal();
  }

  private saveOrUpdate(event: any, modalRef: any): void {
    let formValues: FieldConfig = event;
    let id: number;
    if (this.isEditing) {
      id = this.medics[this.selectedItem].id;
    }
    let doctor: MedicModel = new MedicModel(id);
    doctor.setValuesFromDinamicForm(formValues);
    if (this.isEditing) {
      this._medicService.updateDoctor(doctor).subscribe(
        (response) => {
          this.isEditing = false;
          modalRef.close();
          this.refreshData();
        },
        (error) => {
          this._toastr.error(error.error.error);
        }
      );
    } else {
      this._medicService.postDoctor(doctor).subscribe(
        (response) => {
          modalRef.close();
          this.refreshData();
        },
        (error) => {
          this._toastr.error(error.error.error);
        }
      );
    }
  }

  private showModal() {
    let modalRef = this._modalService.open(EditorModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.id = 'doctoreditor';
    modalRef.componentInstance.title = 'Medico';
    modalRef.componentInstance.formConfig = this.formConfig;
    modalRef.componentInstance.close.subscribe((event) => {
      modalRef.close();
    });
    modalRef.componentInstance.save.subscribe((event) => {
      this.saveOrUpdate(event, modalRef);
    });
  }

  private refreshData(): void {
    this._medicService.getAll().subscribe((data) => {
      this.medics = data.content;
    });
  }

  public deleteDoctor(): void {
    this._medicService
      .deleteDoctor(this.medics[this.selectedItem].id)
      .subscribe(
        (response) => {
          this.refreshData();
          this._toastr.success('El doctor se ha borrado correctamente');
        },
        (error) => {
          this._toastr.error(error.error);
        }
      );
  }
}
