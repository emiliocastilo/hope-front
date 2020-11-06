import { Component, OnInit } from '@angular/core';
import { DispensationModel } from 'src/app/modules/management/models/dispensation/dispensation.model';
import { ActivatedRoute } from '@angular/router';
import { DispensationService } from 'src/app/modules/management/services/dispensation/dispensation.service';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditorModalComponent } from 'src/app/core/components/modals/editor-modal/editor-modal/editor-modal.component';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { ConfirmModalComponent } from 'src/app/core/components/modals/confirm-modal/confirm-modal.component';
import { DetailDispensationModel } from '../../models/dispensation/detail-dispensation.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import TableActionsBuilder from 'src/app/core/utils/TableActionsBuilder';

@Component({
  selector: 'app-dispensations',
  templateUrl: './dispensations.component.html',
  styleUrls: ['./dispensations.component.scss'],
})
export class DispensationsComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _dispensationsService: DispensationService,
    private _notification: NotificationService,
    private _modalService: NgbModal,
    private _formBuilder: FormBuilder
  ) {}

  private currentPage: number = 0;
  private colOrder: any;
  private typeOrder: any;
  private dispensations: DispensationModel[] = [];
  private detailDispensations: DetailDispensationModel[] = [];
  public paginationData: PaginationModel;

  public columnHeaders = ['date', 'startPeriod', 'endPeriod', 'numRecords'];
  private dispensationDetailHeaders = [
    'date',
    'nhc',
    'code',
    'nationalCode',
    'description',
    'quantity',
    'price',
    'daysDispensation',
  ];

  public selectedItem: DispensationModel;
  private modalForm: FormGroup;
  public menu: SideBarItemModel[] = [];
  public menuSelected: SideBarItemModel;
  public showDetails: boolean = false;
  public dispensationsTableActions: TableActionsModel[] = new TableActionsBuilder().getDetailAndDelete();
  ç;
  private itemsPerPage: number;

  ngOnInit(): void {
    this.dispensations = this._activatedRoute.snapshot.data.dispensations.content;
    this.paginationData = this._activatedRoute.snapshot.data.dispensations;
    this.modalForm = this._formBuilder.group({
      startPeriod: ['', Validators.required],
      endPeriod: ['', Validators.required],
      fileDispensation: [null, Validators.required],
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

    if (this.showDetails) {
      const id = `dsp=${this.selectedItem.id}${query}`;
      this.getDetails(id);
    } else {
      this.refreshData(query);
    }
  }

  private refreshData(query: string): void {
    this._dispensationsService.getAll(query).subscribe((data) => {
      this.dispensations = data.content;
      if (this.paginationData.totalPages !== data.totalPages) {
        this.paginationData = data;
      }
      if (this.dispensations.length === 0 && this.paginationData.totalElements > 0){
        this.currentPage = this.currentPage - 1;
        this.selectPage(this.currentPage);
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

  public onSortDetail(event: any) {
    let query = `dsp=${this.selectedItem.id}&sort=${event.column},${event.direction}&page=${this.currentPage}`;

    if (this.itemsPerPage) {
      query = `${query}&size=${this.itemsPerPage}`;
    }

    this.getDetails(query);
  }

  public selectItemsPerPage(number: number) {
    this.itemsPerPage = number;
    this.selectPage(0);
  }

  public selectItemsPerPageDetail(number: number) {
    this.itemsPerPage = number;
    const id = `dsp=${this.selectedItem.id}`;
    this.getDetails(`${id}&size=${number}`);
  }

  private getDetails(query: string): void {
    this._dispensationsService.getDetailsById(query).subscribe((data) => {
      this.detailDispensations = data.content;
      if (this.paginationData.totalPages !== data.totalPages) {
        this.paginationData = data;
      }
    });
  }

  public onSelectedItem(event: number): void {
    this.selectedItem = this.dispensations[event];
  }

  public onIconButtonClick(event: any): void {
    switch (event.type) {
      case 'delete':
        this.showModalConfirm();
        this.showDetails = false;
        break;

      case 'detail':
        this.showDetails = true;
        this.itemsPerPage = 5;
        this.getDetails(`dsp=${this.selectedItem.id}`);
        break;
    }
  }

  public goBackToDispensations() {
    this.showDetails = false;
    this.itemsPerPage = 5;
    const query: string = '&page=0';
    this.refreshData(query);
  }

  private showModalConfirm() {
    const modalRef = this._modalService.open(ConfirmModalComponent);

    modalRef.componentInstance.title = 'Eliminar Dispensacion';
    modalRef.componentInstance.messageModal = `¿Estas seguro de que quieres eliminar la despiensacion de la fecha
      ${new Date(this.selectedItem.date).toLocaleDateString()}?`;
    modalRef.componentInstance.cancel.subscribe((event) => {
      modalRef.close();
    });
    modalRef.componentInstance.accept.subscribe((event) => {
      this.deleteDispensation();
      modalRef.close();
    });
  }

  private deleteDispensation(): void {
    this._dispensationsService.delete(this.selectedItem.id).subscribe(
      (data) => {
        this.refreshData(`&page=${this.currentPage}`);
        this._notification.showSuccessToast('elementDeleted');
      },
      ({ error }) => {
        this._notification.showErrorToast(error.errorCode);
      }
    );
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
    modalRef.componentInstance.id = 'createDispensation';
    modalRef.componentInstance.title = 'Dispensaciones';
    modalRef.componentInstance.form = this.modalForm;
    modalRef.componentInstance.close.subscribe((event: any) => {
      modalRef.close();
    });
    modalRef.componentInstance.save.subscribe((event: any) => {
      this.saveDispensation(event, modalRef);
    });
  }

  private parseDate(date: string) {
    return new Date(date).toISOString();
  }

  private saveDispensation(data: FormGroup, modal: any) {
    const value = data.value;
    value.startPeriod = this.parseDate(value.startPeriod);
    value.endPeriod = this.parseDate(value.endPeriod);

    this._dispensationsService
      .save(value)
      .then((response: any) => {
        modal.close();
        this.refreshData(`&page=${this.currentPage}`);
        this._notification.showSuccessToast('elementCreated');
      })
      .catch((error: any) => {
        this._notification.showErrorToast(error.errorCode);
      });
  }
}
