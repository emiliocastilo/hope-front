import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicFormComponent } from 'src/app/core/components/dynamic-form/dynamic-form.component';
import { EditorModalComponent } from 'src/app/core/components/modals/editor-modal/editor-modal/editor-modal.component';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { MedicModel } from 'src/app/modules/management/models/medic/medic.model';
import { MedicService } from 'src/app/modules/management/services/medic/medic.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceModel } from 'src/app/core/models/service/service.model';
import { TranslateService } from '@ngx-translate/core';
import { HospitalModel } from 'src/app/core/models/hospital/hospital.model';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { ConfirmModalComponent } from 'src/app/core/components/modals/confirm-modal/confirm-modal.component';
import { NotificationService } from 'src/app/core/services/notification.service';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import TableActionsBuilder from 'src/app/core/utils/TableActionsBuilder';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styleUrls: ['./medics.component.scss'],
})
export class MedicsComponent implements OnInit {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  constructor(
    private _modalService: NgbModal,
    private _notification: NotificationService,
    public _medicService: MedicService,
    public _translate: TranslateService,
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute
  ) {}

  public menu: SideBarItemModel[] = [];
  public menuSelected: SideBarItemModel;
  public modalForm: FormGroup;
  public columHeaders = ['name', 'surname', 'dni', 'phone', 'collegeNumber'];
  public hospitals: HospitalModel[] = [];
  public isDetailModal = false;
  public isEditModal = false;
  public isEditing = false;
  public isNewModal = false;
  public medics: MedicModel[] = [];
  public selectedItem: number;
  public services: ServiceModel[] = [];
  public paginationData: PaginationModel;
  private currentPage: number = 0;
  public selectedDoctor = new MedicModel();
  public actions: TableActionsModel[] = new TableActionsBuilder().getEditAndDelete();
  private itemsPerPage: number;

  ngOnInit() {
    this.services = this._activatedRoute.snapshot.data.services;
    this.hospitals = this._activatedRoute.snapshot.data.hospitals;
    this.medics = this._activatedRoute.snapshot.data.medics.content;
    this.paginationData = this._activatedRoute.snapshot.data.medics;

    this.modalForm = this._formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      dni: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{8,8}[A-Za-z]$')],
      ],
      phone: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
          Validators.email,
        ],
      ],
      collegeNumber: ['', Validators.required],
      hospital: [null, Validators.required],
      serviceDTO: [null, Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSearch(data: any) {
    this._medicService.findDoctors(data).subscribe(
      (response) => {
        this.medics = response.content;
      },
      ({ error }) => {
        this._notification.showErrorToast(error.errorCode);
      }
    );
  }

  public onSelectedItem(event: number): void {
    this.selectedItem = event;

    this.medics[event].serviceDTO = [this.medics[event].serviceDTO as any];

    this.selectedDoctor.setValuesFromObject(this.medics[event], this.hospitals);

    Object.keys(this.selectedDoctor).forEach((doctorKey: string) => {
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
      this.showModalConfirm();
    }
  }

  private showModalConfirm() {
    const modalRef = this._modalService.open(ConfirmModalComponent, {
      size: 'lg',
    });

    modalRef.componentInstance.title = 'Eliminar Médico';
    modalRef.componentInstance.messageModal = `¿Estás seguro de que quieres eliminar el médico
      ${this.medics[this.selectedItem].name} ${
      this.medics[this.selectedItem].surname
    }?`;
    modalRef.componentInstance.cancel.subscribe((event) => {
      modalRef.close();
    });
    modalRef.componentInstance.accept.subscribe((event) => {
      this.deleteDoctor();
      modalRef.close();
    });
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

  private saveOrUpdate(event: FormGroup, modalRef: any): void {
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
          this._notification.showSuccessToast('element_updated');
          this.isEditing = false;
          modalRef.close();
          this.refreshData(`&page=${this.currentPage}`);
        },
        ({ error }) => {
          this._notification.showErrorToast(error.errorCode);
        }
      );
    } else {
      this._medicService.postDoctor(doctor).subscribe(
        (response) => {
          this._notification.showSuccessToast('element_created');
          modalRef.close();
          this.refreshData(`&page=${this.currentPage}`);
        },
        ({ error }) => {
          this._notification.showErrorToast(error.errorCode);
        }
      );
    }
  }

  private showModal() {
    const modalRef = this._modalService.open(EditorModalComponent, {
      size: 'lg',
    });
    const options = {
      hospital: this.hospitals,
      serviceDTO: this.services,
    };
    modalRef.componentInstance.id = 'doctoreditor';
    modalRef.componentInstance.title = 'Nuevo Médico';
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
    let query = `&page=${page}`;
    this.currentPage = page;
    if (this.itemsPerPage) {
      query = `${query}&size=${this.itemsPerPage}`;
    }
    this.refreshData(query);
  }

  public onSort(event: any) {
    let query = `&sort=${event.column},${event.direction}&page=${this.currentPage}`;

    if (this.itemsPerPage) {
      query = `${query}&size=${this.itemsPerPage}`;
    }

    this.refreshData(query);
  }

  public selectItemsPerPage(number: number) {
    this.itemsPerPage = number;
    this.selectPage(0);
  }

  private refreshData(query: string): void {
    this._medicService.getAll(query).subscribe((data) => {
      this.medics = data.content;
      if (this.paginationData.totalPages !== data.totalPages) {
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
          this._notification.showSuccessToast('element_deleted');
        },
        ({ error }) => {
          this._notification.showErrorToast(error.errorCode);
        }
      );
  }
}
