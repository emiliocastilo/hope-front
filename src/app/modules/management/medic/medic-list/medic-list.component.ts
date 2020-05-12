import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicFormComponent } from 'src/app/core/components/dynamic-form/dynamic-form.component';
import { EditorModalComponent } from 'src/app/core/components/modals/editor-modal/editor-modal/editor-modal.component';
import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { MedicModel } from 'src/app/modules/management/models/medic/medic.model';
import { MedicModelToRowModelAdapter } from '../../adapters/medic-model-to-row-model.adapter';
import { MedicService } from 'src/app/modules/management/services/medic/medic.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RowDataModel } from 'src/app/core/models/table/row-data.model';
import { ServiceModel } from 'src/app/core/models/service/service.model';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { HospitalModel } from 'src/app/core/models/hospital/hospital.model';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { ColumnHeaderModel } from 'src/app/core/models/table/colum-header.model';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';

@Component({
  selector: 'app-medic-list',
  templateUrl: './medic-list.component.html',
  styleUrls: ['./medic-list.component.scss'],
})
export class MedicListComponent implements OnInit {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  public menu: SideBarItemModel[] = [];
  public menuSelected: SideBarItemModel;

  constructor(
    private _medicModelToRowModelAdapter: MedicModelToRowModelAdapter,
    private _modalService: NgbModal,
    private _toastr: ToastrService,
    public _medicService: MedicService,
    public _translate: TranslateService,
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute
  ) {}

  public modalForm: FormGroup;
  public columHeaders: Array<ColumnHeaderModel> = [
    new ColumnHeaderModel('Nombre', 2),
    new ColumnHeaderModel('Apellidos', 2),
    new ColumnHeaderModel('Dni', 2),
    new ColumnHeaderModel('Teléfono', 2),
    new ColumnHeaderModel('Código de Colegiado', 2),
    new ColumnHeaderModel('Acciones', 2),
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
  public paginationData: PaginationModel;
  private currentPage: number = 0;
  public selectedDoctor = new MedicModel();

  ngOnInit() {
    // Carga menú lateral
    this.menu = JSON.parse(localStorage.getItem('menu')).filter((item) =>
      item.url.endsWith('/management')
    );
    this.menuSelected = this.menu[0].children.find((item) =>
      item.url.endsWith('/management/medics')
    );
    console.log(this.menuSelected);
    // fin carga menú lateral

    this.services = this._activatedRoute.snapshot.data.services;
    this.hospitals = this._activatedRoute.snapshot.data.hospitals;
    this.medics = this._activatedRoute.snapshot.data.medics.content;
    this.paginationData = this._activatedRoute.snapshot.data.medics;

    this.modalForm = this._formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      dni: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      collegeNumber: ['', Validators.required],
      serviceDTO: [null, Validators.required],
      hospital: [null, Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSearch(data: any) {
    this._medicService.findDoctors(data).subscribe(
      (response) => {
        this.medics = response.content;
      },
      (error) => {
        this._toastr.error(error.error.error);
      }
    );
  }

  public prepareTableData(): Array<RowDataModel> {
    const rows = this.medics.map((doctor) => {
      return this._medicModelToRowModelAdapter.adaptModelToRow(doctor);
    });
    return rows;
  }

  public onSelectedItem(event: number): void {
    this.selectedItem = event;

    this.medics[event].serviceDTO = [this.medics[event].serviceDTO as any];

    this.selectedDoctor.setValuesFromObject(this.medics[event], this.hospitals);

    Object.keys(this.selectedDoctor).map((doctorKey: string) => {
      if (this.modalForm.controls[doctorKey]) {
        this.modalForm.controls[doctorKey].setValue(
          this.selectedDoctor[doctorKey]
        );
      }
    });
  }

  public onIconButtonClick(event: any): void {
    if (event && event.type === 'edit') {
      this.editDoctor();
    } else {
      this.deleteDoctor();
    }
  }

  public saveDoctor(): void {
    const control = new FormControl('', Validators.required);
    this.modalForm.addControl('password', control);
    this.isEditing = false;
    this.selectedItem = null;
    this.modalForm.reset();
    this.showModal();
  }

  public editDoctor(): void {
    this.modalForm.removeControl('password');
    this.isEditing = true;
    this.showModal();
  }

  private saveOrUpdate(event: any, modalRef: any): void {
    const formValues: MedicModel = event.value;
    let id: number;
    const currentDoctor = this.medics[this.selectedItem];
    if (this.isEditing) {
      id = currentDoctor.id;
      formValues.userDTO = currentDoctor.userDTO;
    }

    const doctor: MedicModel = new MedicModel(
      id,
      formValues.name,
      formValues.surname,
      formValues.phone,
      formValues.dni,
      formValues.collegeNumber,
      formValues.userDTO,
      formValues.username,
      formValues.password,
      formValues.email,
      formValues.serviceDTO,
      formValues.hospital
    );

    doctor.setValuesFromDinamicForm(formValues);

    if (this.isEditing) {
      this._medicService.updateDoctor(doctor).subscribe(
        (response) => {
          this._toastr.success('Usuario actualizado exitosamente');
          this.isEditing = false;
          modalRef.close();
          this.refreshData(`&page=${this.currentPage}`);
        },
        (error) => {
          this._toastr.error(error.message);
        }
      );
    } else {
      this._medicService.postDoctor(doctor).subscribe(
        (response) => {
          this._toastr.success('Usuario creado exitosamente');
          modalRef.close();
          this.refreshData(`&page=${this.currentPage}`);
        },
        (error) => {
          this._toastr.error(error.message);
        }
      );
    }
  }

  private showModal() {
    let modalRef = this._modalService.open(EditorModalComponent, {
      size: 'lg',
    });
    const options = {
      hospital: this.hospitals,
      serviceDTO: this.services,
    };
    modalRef.componentInstance.id = 'doctoreditor';
    modalRef.componentInstance.title = 'Médico';
    modalRef.componentInstance.options = options;
    modalRef.componentInstance.form = this.modalForm;
    modalRef.componentInstance.close.subscribe((event) => {
      modalRef.close();
    });
    modalRef.componentInstance.save.subscribe((event) => {
      this.saveOrUpdate(event, modalRef);
    });
  }

  public selectPage(page: number): void {
    this.currentPage = page;
    const query: string = `&page=${page}`;
    this.refreshData(query);
  }

  private refreshData(query: string): void {
    this._medicService.getAll(query).subscribe((data) => {
      this.medics = data.content;
      if (this.paginationData.totalElements !== data.totalElements) {
        this.paginationData = data;
      }
    });
  }

  public deleteDoctor(): void {
    this._medicService
      .deleteDoctor(this.medics[this.selectedItem].id)
      .subscribe(
        (response) => {
          this.refreshData(`&page=${this.currentPage}`);
          this._toastr.success('El doctor se ha borrado correctamente');
        },
        (error) => {
          this._toastr.error(error.error);
        }
      );
  }
}
