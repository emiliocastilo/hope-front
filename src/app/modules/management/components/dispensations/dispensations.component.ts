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

  ngOnInit(): void {
    this.dispensations = this._activatedRoute.snapshot.data.dispensations.content;
    this.paginationData = this._activatedRoute.snapshot.data.dispensations;
    this.modalForm = this._formBuilder.group({
      startPeriod: ['', Validators.required],
      endPeriod: ['', Validators.required],
      fileDispensation: [null, Validators.required],
    });

    this.menu = JSON.parse(localStorage.getItem('menu')).filter((item) =>
      item.url.endsWith('/management')
    );
    this.menuSelected = this.menu[0].children.find((item) =>
      item.url.endsWith('/management/dispensations')
    );
  }

  public selectPage(page: number): void {
    this.currentPage = page;
    const query: string = `&page=${page}`;
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
      if (this.paginationData.totalElements !== data.totalElements) {
        this.paginationData = data;
      }
    });
  }

  public onSort(event: any) {
    console.log(event);
    this.refreshData(`&sort=${event.column},${event.direction}`);
  }

  private getDetails(query: string): void {
    this._dispensationsService.getDetailsById(query).subscribe((data) => {
      this.detailDispensations = data.content;
      if (this.paginationData.totalElements !== data.totalElements) {
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

      case 'details':
        this.showDetails = true;
        this.getDetails(`dsp=${this.selectedItem.id}`);
        break;
    }
  }

  public goBackToDispensations() {
    this.showDetails = false;
    const query: string = '&page=0';
    this.refreshData(query);
  }

  private showModalConfirm() {
    const modalRef = this._modalService.open(ConfirmModalComponent);

    modalRef.componentInstance.title = 'Eliminar Dispensacion';
    modalRef.componentInstance.messageModal = `Estas seguro de que quieres eliminar la despiensacion de la fecha 
      ${this.selectedItem.date}?`;
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
        this._notification.showSuccessToast('element_deleted');
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
    let formatedDate = null;
    if (date) {
      const dateObject = new Date(date);
      const day =
        dateObject.getDate() < 10
          ? `0${dateObject.getDate()}`
          : dateObject.getDate();
      const month = Math.round(dateObject.getMonth() + 1);
      const monthWithCero = month < 10 ? `0${month}` : month;
      const year = dateObject.getFullYear();
      formatedDate = `${day}-${monthWithCero}-${year} 00:00:00`;
    }
    return formatedDate;
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
        this._notification.showSuccessToast('element_created');
      })
      .catch((error: any) => {
        this._notification.showErrorToast(error.errorCode);
      });
  }
}
