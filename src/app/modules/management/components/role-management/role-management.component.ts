import { Component, OnInit } from '@angular/core';
import { RoleManagementService } from '../../services/roles/role-management.service';
import { RowDataModel } from 'src/app/core/models/table/row-data.model';
import { RolModel } from '../../models/rol.model';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditorModalComponent } from 'src/app/core/components/modals/editor-modal/editor-modal/editor-modal.component';
import { ActivatedRoute } from '@angular/router';
import { ConfirmModalComponent } from 'src/app/core/components/modals/confirm-modal/confirm-modal.component';
import { NotificationService } from 'src/app/core/services/notification.service';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import TableActionsBuilder from 'src/app/core/utils/TableActionsBuilder';
import { HospitalModel } from '../../../../core/models/hospital/hospital.model';
import { ServiceModel } from '../../../../core/models/service/service.model';
import { MedicModel } from '../../models/medic/medic.model';
import { MedicService } from '../../services/medic/medic.service';
import { HospitalService } from '../../../../core/services/hospital/hospital.service';
import { PathologyModel } from '../../models/patients/pathology.model';
import { PatientModel } from '../../models/patients/patient.model';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss'],
})
export class RoleManagementComponent implements OnInit {
  public columnsHeader: Array<string> = ['name', 'description'];
  public roles: Array<RolModel>;
  public menu: SideBarItemModel[] = [];
  public menuSelected: SideBarItemModel;
  public tableData: Array<RowDataModel>;
  public selectedItem: number;
  public selectedRole: RolModel;
  public isEditing = false;
  public rol: RolModel[] = [];
  public paginationData: PaginationModel;
  private currentPage = 0;
  public hospitals: HospitalModel[] = [];
  public services: ServiceModel[] = [];
  private pathologies: PathologyModel[] = [];
  private pathologiesIds: string[] = [];
  public selectedPatient: PatientModel = new PatientModel();
  public selectedUser: any;
  private colOrder: any;
  private typeOrder: any;
  public modalForm: FormGroup;
  public actions: TableActionsModel[] = new TableActionsBuilder().getEditAndDelete();
  private itemsPerPage: number;

  constructor(
    private _roleManagementService: RoleManagementService,
    private _modalService: NgbModal,
    public _medicService: MedicService,
    private _activatedRoute: ActivatedRoute,
    private _notification: NotificationService,
    private _formBuilder: FormBuilder,
    private _hospitalService: HospitalService
  ) {}

  ngOnInit(): void {
    this.paginationData = this._activatedRoute.snapshot.data.roles;
    this.services = this._activatedRoute.snapshot.data.services;
    this.hospitals = this._activatedRoute.snapshot.data.hospitals;

    this.selectedUser = JSON.parse(localStorage.getItem('user'));
    const userHospital: any = this.hospitals.find(
      (hospital) => hospital.id === this.selectedUser.hospitalId
    );
    this.hospitals = [userHospital];
    this.pathologies = userHospital.pathologies;
    this.getPathologiesIds();
    this.modalForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      hospital: ['', Validators.required],
      serviceDTO: ['', Validators.required],
      pathology: ['', Validators.required],
    });
  }

  public onSelectedItem(event: number): void {
    /*this.selectedRole = this.roles[event];*/
    this.selectedItem = event;
    /*this.selectedRole.setValuesFromObject(this.rol[event], this.hospitals);*/
    Object.keys(this.roles[event]).forEach((patientKey: string) => {
      if (this.modalForm.controls[patientKey]) {
        this.modalForm.controls[patientKey].setValue(
          this.roles[event][patientKey]
        );
      }
    });
  }
  public getPathologiesIds() {
    this.pathologies.forEach((pathology) => {
      this.pathologiesIds.push(pathology.id);
    });
  }

  public onSearch(event: string): void {
    this._roleManagementService.getRolSearches(event).subscribe((data: any) => {
      this.roles = data.content;
    });
  }

  public selectPage(page: number): void {
    let query: string;
    if (this.colOrder && this.typeOrder) {
      query = `&sort=${this.colOrder},${this.typeOrder}&page=${page}`;
    } else {
      query = `&page=${page}`;
    }
    this.currentPage = page;
    if (this.itemsPerPage) {
      query = `${query}&size=${this.itemsPerPage}`;
    }
    this.refreshData(query);
  }

  public showModal() {
    const modalRef = this._modalService.open(EditorModalComponent, {
      size: 'lg',
    });
    let options: any = {};
    if (
      this.selectedItem != null &&
      this.selectedRole.hospital.length > 0 &&
      this.selectedRole.serviceDTO
    ) {
      const servicesDto: any[] = [this.selectedRole.serviceDTO];
      options = {
        hospital: {
          options: this.hospitals,
          optionSelected: this.selectedRole.hospital[0].id,
        },
        serviceDTO: {
          options: this.services,
          optionSelected: servicesDto[0].id,
        },
        pathology: {
          options: this.pathologies,
          optionSelected: this.selectedPatient.pathologies[0].id,
        },
      };
    } else {
      this.services = [];
      options = {
        hospital: { options: this.hospitals },
        serviceDTO: { options: this.services },
        pathology: { options: this.pathologies },
      };
    }
    modalRef.componentInstance.id = 'rolesEditor';
    modalRef.componentInstance.title = 'Rol';
    modalRef.componentInstance.form = this.modalForm;
    modalRef.componentInstance.options = options;
    modalRef.componentInstance.close.subscribe((event) => {
      modalRef.close();
    });
    modalRef.componentInstance.save.subscribe((event) => {
      this.saveOrUpdate(event, modalRef);
    });
  }

  private saveOrUpdate(event: any, modalRef: any): void {
    const formValues: RolModel = event.value;
    let id;
    if (this.isEditing) {
      id = this.roles[this.selectedItem].id;
    }
    const pathologies = [];
    pathologies.push(formValues.pathology[0]);
    const rol: RolModel = new RolModel(
      id,
      formValues.name,
      formValues.description,
      formValues.userDTO,
      formValues.serviceDTO,
      formValues.hospital,
      pathologies
    );
    rol.setValuesFromDinamicForm(formValues);
    this.selectedRole = new RolModel();
    if (this.isEditing) {
      this._roleManagementService.updateRole(rol).subscribe(
        (response) => {
          this.isEditing = false;
          modalRef.close();
          this.refreshData(`&page=${this.currentPage}`);
        },
        ({ error }) => {
          this._notification.showErrorToast(error.errorCode);
        }
      );
    } else {
      this._roleManagementService.createRole(rol).subscribe(
        (response) => {
          modalRef.close();
          this.refreshData(`&page=${this.currentPage}`);
        },
        ({ error }) => {
          this._notification.showErrorToast(error.errorCode);
        }
      );
    }
  }

  public newRole() {
    this.isEditing = false;
    this.selectedItem = null;
    this.modalForm.reset();
    this.showModal();
  }

  public onIconButtonClick(event: any) {
    if (event && event.type === 'edit') {
      this.editRole();
    } else if (event && event.type === 'delete') {
      this.showModalConfirm();
    }
  }

  private showModalConfirm() {
    const modalRef = this._modalService.open(ConfirmModalComponent);

    modalRef.componentInstance.title = 'Eliminar Rol';
    modalRef.componentInstance.messageModal = `¿Estás seguro de que quieres eliminar el rol ${
      this.roles[this.selectedItem].name
    }?`;
    modalRef.componentInstance.cancel.subscribe((event) => {
      modalRef.close();
    });
    modalRef.componentInstance.accept.subscribe((event) => {
      this.deleteRole();
      modalRef.close();
    });
  }

  public editRole(): void {
    this.isEditing = true;
    this.showModal();
  }

  public deleteRole(): void {
    this._roleManagementService
      .deleteRole(this.roles[this.selectedItem].id)
      .subscribe(
        (response) => {
          this._notification.showSuccessToast('elementDeleted');
          this.refreshData(`&page=${this.currentPage}`);
        },
        ({ error }) => {
          this._notification.showErrorToast(error.errorCode);
        }
      );
  }

  private refreshData(query: string): void {
    this._roleManagementService.getRoles(query).subscribe((data) => {
      this.roles = data.content;
      if (this.paginationData.totalPages !== data.totalPages) {
        this.paginationData = data;
      }
    });
  }

  public onSort(event: any) {
    this.colOrder = event.column;
    this.typeOrder = event.direction;
    let query = `&sort=${this.colOrder},${this.typeOrder}&page=${this.currentPage}`;

    if (this.itemsPerPage) {
      query = `${query}&size=${this.itemsPerPage}`;
    }

    this.refreshData(query);
  }

  public selectItemsPerPage(number: number) {
    this.itemsPerPage = number;
    this.selectPage(0);
  }
}
