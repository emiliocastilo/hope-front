import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    if (this.config.value && this.config.value.length > 0) {
      this.rows = JSON.parse(this.config.value);
      setTimeout(() => {
        this.bindToForm();
      }, 1000);
    }
  }

  newRow() {
    let newRow = {};
    this.config.fields.forEach((field) => {
      newRow = {
        ...newRow,
        [field.name]: field.type === 'select' ? field.options[0].name : '',
      };
    });
    this.rows.push(newRow);
    this.isEditing = true;
    this.enableEditIndex = this.rows.length - 1;
  }

  onChange(event: any, header: string, index: number) {
    this.rows[index][header] = event.target.value;
  }

  onSaveRow() {
    event.preventDefault();
    this.bindToForm();
    this.isEditing = false;
  }

  bindToForm() {
    const control = this.group.controls[this.config.name] as FormArray;
    control.removeAt(0);
    this.rows.forEach((r) => {
      this.group.controls[this.config.name].value.push(r);
    });
  }

  onCancel() {
    event.preventDefault();
    this.rows.splice(this.rows.length - 1, 1);
    this.isEditing = false;
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
        break;
      case 'remove':
        this.rows.splice(i, 1);
        this.onSaveRow();
        break;
      case 'eye':
        this.openModalDetail(i, content);
        break;
      default:
        break;
    }
  }
}
