import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import moment from 'moment';
import { DynamicModalComponent } from '../../modals/dynamic-modal/dynamic-modal.component';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss'],
})
export class FormListComponent implements OnInit {
  config: FieldConfig;
  group: FormGroup;
  rows = [];
  isEditing = false;
  enableEditIndex: number;
  detailArray: Array<any>;
  isAddingNewLine = false;
  lastEditLine: any;
  today: string;

  constructor(private modalService: NgbModal, private datePipe: DatePipe) {}

  ngOnInit() {
    this.today = moment(new Date()).format('YYYY-MM-DD');
    if (this.config.value && this.config.value.length > 0) {
      this.rows = this.config.value;
      this.bindToForm();
    }
  }

  newRow() {
    const modalRef = this.modalService.open(DynamicModalComponent, {
      size: 'xl',
    });
    modalRef.componentInstance.key = this.config.template;
    modalRef.componentInstance.close.subscribe(() => {
      modalRef.close();
    });
    modalRef.componentInstance.save.subscribe((event) => {
      this.rows.push(event);
      modalRef.close();
    });
    // if (!this.isEditing) {
    //   let newRow = {};
    //   this.config.fields.forEach((field) => {
    //     newRow = {
    //       ...newRow,
    //       [field.name]: field.type === 'select' ? field.options[0].name : '',
    //     };
    //   });
    //   this.rows.push(newRow);
    //   this.isEditing = true;
    //   this.enableEditIndex = this.rows.length - 1;
    //   this.isAddingNewLine = true;
    //   this.setInvalidForm(true);
    // }
  }

  setInvalidForm(error: boolean) {
    setTimeout(() => {
      if (error) {
        this.group.controls[this.config.name].setErrors({ incorrect: error });
      } else {
        this.group.controls[this.config.name].setErrors(null);
      }
    }, 100);
  }

  onChange(event: any, header: string) {
    const value = header.toLowerCase().includes('date')
      ? new Date(event.target.value).toISOString()
      : event.target.value;
    this.rows[this.enableEditIndex][header] = value;
  }

  onSaveRow() {
    event.preventDefault();
    if (!this.isAddingNewLine) {
      this.group.controls[this.config.name].value[
        this.enableEditIndex
      ] = this.rows[this.enableEditIndex];
    } else {
      this.bindToForm();
    }

    this.isEditing = false;
    this.isAddingNewLine = false;
    this.setInvalidForm(false);
  }

  onDeleteRow(index) {
    event.preventDefault();
    this.rows.splice(index, 1);
    this.deleteToForm(index);
    this.isEditing = false;
  }

  onCancelRow(index) {
    event.preventDefault();
    if (this.isAddingNewLine) {
      this.rows.splice(index, 1);
    } else {
      this.rows[index] = this.lastEditLine;
    }
    this.bindToForm();
    this.isAddingNewLine = false;
    this.isEditing = false;
    this.setInvalidForm(false);
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
        this.isEditing = true;
        this.enableEditIndex = i;
        this.lastEditLine = { ...this.rows[i] };
        this.setInvalidForm(true);
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

  formatDate(date) {
    return moment(date).format('YYYY-MM-DD');
  }

  showDataTable(row: any, header: string) {
    let data = row;

    const conditionDate =
      header.toLowerCase().includes('date') ||
      header.toLowerCase().includes('period') ||
      header.toLowerCase().includes('period');

    if (conditionDate) {
      data = this.datePipe.transform(row, 'dd/MM/yy');
    }

    return data;
  }
}
