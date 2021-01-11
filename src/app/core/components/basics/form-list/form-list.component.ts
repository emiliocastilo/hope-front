import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import moment from 'moment';
import { DynamicModalComponent } from '../../modals/dynamic-modal/dynamic-modal.component';
import { FormsService } from 'src/app/core/services/forms/forms.service';
import { IndicationService } from 'src/app/modules/management/services/indications/indication.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-form-list',
    templateUrl: './form-list.component.html',
    styleUrls: ['./form-list.component.scss'],
})
export class FormListComponent implements OnInit {
    config: FieldConfig;
    group: FormGroup;
    rows = [];
    detailArray: Array<any>;
    today: string;

    constructor(private modalService: NgbModal, private datePipe: DatePipe, private translate: TranslateService, private _formsService: FormsService, private _indicationService: IndicationService) {}

    ngOnInit() {
        this.today = moment(new Date()).format('YYYY-MM-DD');
        if (this.config.value && this.config.value.length > 0) {
            this.rows = this.config.value;
            this.bindToForm();
        }
    }

    openModalCreate() {
        this._formsService.editing =false;
        const modalRef = this.modalService.open(DynamicModalComponent, {
            size: 'lg',
        });
        modalRef.componentInstance.title = 'Nuevo ' + this.config.label;
        modalRef.componentInstance.fields = this.config.fields;
        modalRef.componentInstance.close.subscribe(() => {
            modalRef.close();
        });
        modalRef.componentInstance.save.subscribe((event) => {
            this._formsService.setSavedForm(false);
            this.rows.push(event);
            this.bindToForm();
            modalRef.close();
        });
    }

    setInvalidForm(error: boolean) {
        setTimeout(() => {
            if (error) {
                this.group.controls[this.config.name].setErrors({
                    incorrect: error,
                });
            } else {
                this.group.controls[this.config.name].setErrors(null);
            }
        }, 100);
    }

    onDeleteRow(index) {
        event.preventDefault();
        this.rows.splice(index, 1);
        this._formsService.setSavedForm(false);
        this.deleteToForm(index);
    }

    bindToForm() {
        setTimeout(() => {
            this.rows.forEach((r) => {
                this.group.controls[this.config.name].value.push(r);
            });
        }, 500);
    }

    deleteToForm(index) {
        this.group.controls[this.config.name].value.splice(index, 1);
    }

    openModalDetail(i: number, content: any) {
        this.detailArray = [];
        Object.entries(this.rows[i]).forEach((e) => {
            const entry = {
                name: e[0],
                value: e[1],
            };
            this.detailArray.push(entry);
        });
        this.modalService.open(content).result.then(
            (result) => {},
            (reason) => {}
        );
    }

    emitIconButtonClick(action, i, content) {
        event.preventDefault();
        switch (action) {
            case 'edit':
                this.openModalEdit(i);
                break;
            case 'delete':
                this.onDeleteRow(i);
                break;
            case 'detail':
                this.openModalDetail(i, content);
                break;
            default:
                break;
        }
    }

    openModalEdit(index: number) {
        const modalRef = this.modalService.open(DynamicModalComponent, {
            size: 'lg',
        });
        modalRef.componentInstance.title = 'Editar ' + this.config.label;
        modalRef.componentInstance.fields = this.config.fields;
        modalRef.componentInstance.data = this.rows[index];
        modalRef.componentInstance.close.subscribe(() => {
            modalRef.close();
        });
        modalRef.componentInstance.save.subscribe((event) => {
            this.rows[index] = event;
            this._formsService.setSavedForm(false);
            this.bindToForm();
            modalRef.close();
        });
    }

    formatDate(date) {
        return moment(date).format('YYYY-MM-DD');
    }

    showDataTable(row: any, header: string) {
        let data = row;
        const conditionDate = header.toLowerCase().includes('date') || header.toLowerCase().includes('period');

        if (header === 'typePsoriasis') {
            let indications = this._indicationService.indications;
            if (indications && indications.length > 0) {
                data = this.translate.instant(indications.filter((f) => f.id === row)[0].description);
            } else {
                this._indicationService.getList().subscribe((response) => {
                    indications = response;
                    data = this.translate.instant(indications.filter((f) => f.id === row)[0].description);
                });
            }
        }

        if (conditionDate) {
            data = this.datePipe.transform(row, 'dd/MM/yy');
        }

        if (typeof data === 'boolean') {
            data = data ? 'Si' : 'No';
        }

        return data;
    }
}
