import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from 'src/app/core/components/modals/confirm-modal/confirm-modal.component';
import { EditorModalComponent } from 'src/app/core/components/modals/editor-modal/editor-modal/editor-modal.component';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { RowDataModel } from 'src/app/core/models/table/row-data.model';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import { NotificationService } from 'src/app/core/services/notification.service';
import TableActionsBuilder from 'src/app/core/utils/TableActionsBuilder';
import { QueryParams } from '../../interfaces/query-params.interface';
import { QueryResult } from '../../interfaces/query-result.interface';
import { MedicineModel } from '../../models/medicines/medicines.model';
import { MedicinesService } from '../../services/medicines/medicines.service';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.scss'],
})
export class MedicinesComponent implements OnInit {
  private currentPage = 0;
  private colOrder: any;
  private typeOrder: any;
  private itemsPerPage: number;
  private queryParams: QueryParams;

  public loading: boolean;
  public columnsHeader: Array<string> = [];
  public menu: SideBarItemModel[] = [];
  public modalForm: FormGroup;
  public menuSelected: SideBarItemModel;
  public tableData: Array<RowDataModel>;
  public selectedItem: number;
  public isEditing = false;
  public paginationData: PaginationModel;
  public selectedUser: any;
  public medicines: Array<MedicineModel>;
  public selectedMedicine: MedicineModel;
  public actions: TableActionsModel[] = new TableActionsBuilder().getDelete();

  constructor(
    private _modalService: NgbModal,
    private _notification: NotificationService,
    private _medicinesService: MedicinesService,
    private _formBuilder: FormBuilder
  ) {
    this.columnsHeader = [
      'nationalCode',
      'actIngredients',
      'codeAct',
      'authorized',
      'commercialization',
      'viaAdministration',
    ];
  }

  ngOnInit(): void {
    this.loading = true;
    this.selectedUser = JSON.parse(localStorage.getItem('user'));
    this.loadData();

    this.modalForm = this._formBuilder.group({
      fileMedicine: [null, Validators.required],
    });
  }

  private loadData() {
    this._medicinesService.get().subscribe(
      (response: QueryResult<MedicineModel>) => {
        this.medicines = response.content;
        this.paginationData = response;
        this.dataMap();
      },
      (error) => this._notification.showErrorToast(error.errorCode),
      () => (this.loading = false)
    );
  }

  private dataMap() {
    this.medicines.forEach((item) => {
      item.authorized = item.authorized ? 'Sí' : 'No';
      item.commercialization = item.commercialization ? 'Sí' : 'No';
    });
  }

  private cleanModal(): void {
    this.modalForm.reset();
    this.selectedItem = undefined;
  }

  public showModal() {
    this.cleanModal();
    let modalRef = this._modalService.open(EditorModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.id = 'editmedicine';
    modalRef.componentInstance.title = 'Medicamentos';
    modalRef.componentInstance.form = this.modalForm;
    modalRef.componentInstance.close.subscribe((event: any) => {
      modalRef.close();
    });
    modalRef.componentInstance.save.subscribe((event: any) => {
      this.saveMedicine(event, modalRef);
    });
  }

  private saveMedicine(data: FormGroup, modal: any) {
    const value = data.value;
    modal.componentInstance.loading = true;
    modal.componentInstance.disabled = true;
    this._medicinesService
      .saveFromFile(value)
      .then((response: any) => {
        if (response.ok) {
          modal.close();
          this.loadData();
        } else {
          modal.componentInstance.disabled = false;
          modal.componentInstance.loading = false;
          this._notification.showErrorToast(response.statusText);
        }
      })
      .catch((error: any) => {
        modal.componentInstance.disabled = false;
        modal.componentInstance.loading = false;
        this._notification.showErrorToast(error.errorCode);
      });
  }

  private refreshData(query: string): void {
    const user_aux = JSON.parse(localStorage.getItem('user') || '{}');
    this._medicinesService
      .get(query)
      .subscribe((data: QueryResult<MedicineModel>) => {
        this.medicines = data.content;
        this.dataMap();
        if (this.paginationData.totalPages !== data.totalPages) {
          this.paginationData = data;
        }
        if (
          this.medicines.length === 0 &&
          this.paginationData.totalElements > 0
        ) {
          this.currentPage = this.currentPage - 1;
          this.selectPage(this.currentPage);
        }
      });
  }

  private delete() {}

  private showModalConfirm() {
    const modalRef = this._modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = 'Eliminar medicamento';
    modalRef.componentInstance.messageModal = `¿Estás seguro de que quieres eliminar el medicamento ${
      this.medicines[this.selectedItem].presentation
    }?`;
    modalRef.componentInstance.cancel.subscribe((event) => {
      modalRef.close();
    });
    modalRef.componentInstance.accept.subscribe((event) => {
      this.delete();
      modalRef.close();
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

  public onSelectedItem(event: any): void {
    this.selectedItem = event;
    this.selectedMedicine.setValuesFromObject(this.medicines[event]);

    Object.keys(this.medicines[event]).forEach((key: string) => {
      if (this.modalForm.controls[key]) {
        this.modalForm.controls[key].setValue(this.medicines[event][key]);
      }
    });
  }

  public onSearch(event: string): void {
    this._medicinesService
      .getSearch(event)
      .subscribe((data: QueryResult<MedicineModel>) => {
        this.medicines = data.content;
        this.dataMap();
        if (this.paginationData.totalPages !== data.totalPages) {
          this.paginationData = data;
        }
        if (
          this.medicines.length === 0 &&
          this.paginationData.totalElements > 0
        ) {
          this.currentPage = this.currentPage - 1;
          this.selectPage(this.currentPage);
        }
      });
  }

  public onSort(event: any) {
    this.colOrder = event.column;
    this.typeOrder = event.direction;
    let query = `&sort=${this.colOrder},${this.typeOrder}&page=${this.currentPage}`;
    if (this.itemsPerPage) query = `${query}&size=${this.itemsPerPage}`;
    this.refreshData(query);
  }

  public onIconButtonClick(event: any) {
    if (event && event.type === 'edit') {
      // this.edit();
    } else if (event && event.type === 'delete') {
      this.showModalConfirm();
    }
  }
}
