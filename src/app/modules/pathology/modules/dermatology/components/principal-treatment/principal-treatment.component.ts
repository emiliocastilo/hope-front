import { IndicationService } from './../../../../../management/services/indications/indication.service';
import { FormsService } from './../../../../../../core/services/forms/forms.service';
import { PrincipalTreatmentModalEditComponent } from './../principal-treatment-modal/principal-tratment-modal-edit/principal-treatment-modal-edit.component';
import { SortModel } from './../../../../../../core/components/table/table.component';
import { IndicationModel } from './../../../../../management/models/indication/indication.model';
import { DermaTreatmentModel, EditTreatmentModel, LineTreatment, SuspendTreatmentModel } from './../../models/derma-treatment.model';
import { DermaTreatmentsService } from './../../services/derma-treatments.service';
import { Component, OnInit } from '@angular/core';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import { Pagination, PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/core/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { constants } from 'src/constants/constants';
import { PatientModel } from 'src/app/modules/pathology/models/patient.model';
import { PrincipalTreatmentModalCreateComponent } from '../principal-treatment-modal/principal-tratment-modal-create/principal-treatment-modal-create.component';
import { PrincipalTreatmentModalSuspendComponent } from '../principal-treatment-modal/principal-tratment-modal-suspend/principal-treatment-modal-suspend.component';
import { ConfirmModalComponent } from 'src/app/core/components/modals/confirm-modal/confirm-modal.component';
import moment from 'moment';

@Component({
    selector: 'app-principal-treatment',
    templateUrl: './principal-treatment.component.html',
    styleUrls: ['./principal-treatment.component.scss'],
})
export class PrincipalTreatmentComponent implements OnInit {
    private currentIndication: IndicationModel;
    key = constants.farmacologiesTreatments;
    public columHeaders = ['indication', 'principle', 'brand', 'dose', 'dateStart', 'datePrescription', 'dateSuspension', 'treatmentType'];
    public actions: TableActionsModel[] = [new TableActionsModel('suspend', 'edit-3'), new TableActionsModel('edit', 'edit-2'), new TableActionsModel('delete', 'trash')];
    public tableData: any[] = [];
    public dataBackUp: DermaTreatmentModel[] = [];
    public tableDataFilter: any[] = [];

    public patient: PatientModel;
    private indication: string = '';
    private currentPage: number = 0;
    private itemsPerPage: number = 5;
    private colOrder: any;
    private typeOrder: any;
    public paginationData: PaginationModel;

    constructor(
        private readonly _modalService: NgbModal,
        private readonly _notification: NotificationService,
        private readonly _translate: TranslateService,
        private readonly _formsService: FormsService,
        private readonly _indicationService: IndicationService,
        private readonly _dermaTreatmentsService: DermaTreatmentsService
    ) {}

    ngOnInit(): void {
        this.patient = JSON.parse(localStorage.getItem('selectedPatient'));
        this.paginationData = {
            number: 0,
            totalPages: 0,
            size: 0,
            totalElements: 0,
        };

        this.typeOrder = '';
        this.colOrder = '';
        this.getFormDatas();
        this.getTreatments(this.makeQueryPaginator());
    }

    private getFormDatas() {
        this._formsService.getFormsDatas(`template=principal-diagnosis&patientId=${this.patient.id}&name=principalIndication`).subscribe(
            (data: string) => {
                let indications = this._indicationService.indications;
                if (!indications) this.indication = data;

                if (!this._indicationService.indications || this._indicationService.indications.length === 0) {
                    this._indicationService.getList().subscribe((response) => {
                        this.currentIndication = response.find((f) => f.code === data);
                        this.indication = this._translate.instant(this.currentIndication.description);
                    });
                } else {
                    this.indication = this._translate.instant(this._indicationService.indications.filter((f) => f.code === data)[0].description);
                    this.currentIndication = this._indicationService.indications.find((f) => f.code === data);
                }
            },
            ({ error }) => {
                // this._notification.showErrorToast(error.errorCode);
            }
        );
    }

    private getTreatments(query: string): void {
        this._dermaTreatmentsService.getAllByPatient(this.patient.id, query).subscribe((treatments: Pagination<DermaTreatmentModel>) => {
            this.dataBackUp = treatments?.content;
            if (this.dataBackUp) {
                this.tableData = this.treatmentsToDataTable(this.dataBackUp);
                // this.paginationData = treatments;

                this.paginationData.totalElements = treatments.totalElements;
                if (this.paginationData.totalPages !== treatments.totalPages) {
                    this.paginationData = treatments;
                }
            }
        });
    }

    public showModalCreate(): void {
        let modalRef: NgbModalRef = this._modalService.open(PrincipalTreatmentModalCreateComponent, { size: 'lg' });

        modalRef.componentInstance.indication = this.currentIndication;
        modalRef.componentInstance.patientId = this.patient.id;
        modalRef.componentInstance.cancel.subscribe((event: any) => modalRef.close());

        modalRef.componentInstance.save.subscribe((treatment: DermaTreatmentModel) => {
            if (!treatment.masterFormula) {
                this._dermaTreatmentsService.isMedicineRepeated(this.patient.id, treatment.medicine.id.toString()).subscribe((isRepeated: boolean) => {
                    !isRepeated ? this.createTreatment(treatment, modalRef) : this._notification.showErrorToast('duplicatedTreatment');
                });
            } else {
                this.createTreatment(treatment, modalRef);
            }
        });
    }

    private createTreatment(treatment: DermaTreatmentModel, modalRef: NgbModalRef): void {
        this._dermaTreatmentsService.createTreatment(treatment).subscribe(
            () => {
                modalRef.close();
                this.currentPage = 0;
                this.getTreatments(this.makeQueryPaginator());
            },
            (error) => this._notification.showErrorToast(error.message)
        );
    }

    public async showModalSuspend(index: number) {
        const treatment: DermaTreatmentModel = this.dataBackUp.find((treatment) => treatment.treatmentId === this.tableData[index].treatmentId);
        const line: LineTreatment = treatment.lines.find((line: LineTreatment) => line.lineId === this.tableData[index].lineId);

        if (line.suspensionDate) {
            this._notification.showErrorToast('treatmentAlreadySuspend');
        } else {
            this.formatDates(treatment);
            this.formatDates(line);

            let modalRef = this._modalService.open(PrincipalTreatmentModalSuspendComponent, { size: 'lg' });

            modalRef.componentInstance.treatment = treatment;
            modalRef.componentInstance.lineTreatment = line;
            modalRef.componentInstance.cancel.subscribe((event: any) => {
                modalRef.close();
            });
            modalRef.componentInstance.suspend.subscribe((suspendTreatment: SuspendTreatmentModel) => {
                this._dermaTreatmentsService.suspendTreatment(suspendTreatment).subscribe(() => {
                    modalRef.close();
                    this.getTreatments(this.makeQueryPaginator());
                });
            });
        }
    }

    public async showModalEdit(index: number) {
        const treatment: DermaTreatmentModel = this.dataBackUp.find((treatment) => treatment.treatmentId === this.tableData[index].treatmentId);
        const line: LineTreatment = treatment.lines.find((line: LineTreatment) => line.lineId === this.tableData[index].lineId);
        if (line.suspensionDate) {
            this._notification.showErrorToast('treatmentAlreadySuspend');
        } else {
            this.formatDates(treatment);
            this.formatDates(line);

            let modalRef = this._modalService.open(PrincipalTreatmentModalEditComponent, { size: 'lg' });

            modalRef.componentInstance.treatment = treatment;
            modalRef.componentInstance.lineTreatment = line;

            modalRef.componentInstance.indication = this.currentIndication;
            modalRef.componentInstance.title = 'editTreatment';
            modalRef.componentInstance.cancel.subscribe((event: any) => modalRef.close());
            modalRef.componentInstance.save.subscribe((treatment: EditTreatmentModel) => {
                this._dermaTreatmentsService.updateTreatment(treatment).subscribe(() => {
                    modalRef.close();
                    this.getTreatments(this.makeQueryPaginator());
                });
            });
        }
    }

    private showModalConfirmDelete(index: number) {
        const treatment: DermaTreatmentModel = this.dataBackUp.find((treatment) => treatment.treatmentId === this.tableData[index].treatmentId);
        const line: LineTreatment = treatment.lines.find((line: LineTreatment) => line.lineId === this.tableData[index].lineId);
        const modalRef = this._modalService.open(ConfirmModalComponent);

        modalRef.componentInstance.title = this._translate.instant('btn.delete');
        modalRef.componentInstance.messageModal = this._translate.instant('areYouSureDelete');
        modalRef.componentInstance.cancel.subscribe((event: any) => {
            modalRef.close();
        });
        modalRef.componentInstance.accept.subscribe((event: any) => {
            this._dermaTreatmentsService.deleteTreatment(line.lineId.toString()).subscribe(() => {
                modalRef.close();
                this.getTreatments(this.makeQueryPaginator());
            });
        });
    }

    public onIconButtonClick($event: any) {
        switch ($event.type) {
            case 'suspend':
                this.showModalSuspend($event.selectedItem);
                break;
            case 'edit':
                this.showModalEdit($event.selectedItem);
                break;
            case 'delete':
                this.showModalConfirmDelete($event.selectedItem);
                break;
        }
    }

    public selectItemsPerPage(number: number) {
        this.itemsPerPage = number;
        this.getTreatments(this.makeQueryPaginator());
    }

    public selectPage(page: number) {
        if (this.currentPage !== page) {
            this.currentPage = page;
            this.getTreatments(this.makeQueryPaginator());
        }
    }

    public onSort(event: SortModel) {
        this.colOrder = event.column;
        this.typeOrder = event.direction;
        this.getTreatments(this.makeQueryPaginator());
    }

    private treatmentsToDataTable(treatments: Array<DermaTreatmentModel>): Array<any> {
        const dataTable: Array<any> = [];
        treatments.forEach((treatment: DermaTreatmentModel) => {
            treatment.lines.forEach((line: LineTreatment) => {
                dataTable.push({
                    lineId: line.lineId,
                    treatmentId: line.patientTreatment,
                    indication: this.indication,
                    principle: line.medicine?.actIngredients,
                    brand: line.medicine?.brand,
                    dose: line.dose,
                    dateStart: line.initDate,
                    datePrescription: line.datePrescription,
                    dateSuspension: line.suspensionDate,
                    treatmentType: line.type,
                    rowColor: line.suspensionDate ? true : false,
                });
            });
        });
        return dataTable;
    }

    private formatDates(treatment: any) {
        Object.keys(treatment).forEach((key: string) => {
            if (key.toLowerCase().includes('date') && treatment[key]) {
                treatment[key] = moment(treatment[key]).format('YYYY-MM-DD');
            }
        });
    }

    private makeQueryPaginator(): string {
        let query: string = `&page=${this.currentPage}&size=${this.itemsPerPage}`;
        if (this.colOrder && this.typeOrder) {
            query += `&sort=${this.colOrder},${this.typeOrder}`;
        } else {
            query += `&sort=line.suspensionDate,desc`;
        }
        return query;
    }
}
