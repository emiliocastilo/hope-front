import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss'],
})
export class FormListComponent implements OnInit {
  config: FieldConfig;
  group: FormGroup;
  headers = [];
  rows = [];
  isEditing = false;
  enableEditIndex: number;

  constructor() {}

  ngOnInit() {
    if (this.config.value && this.config.value.length > 0) {
      this.rows = this.config.value;
    }
    this.config.columns.forEach((e) => {
      this.headers.push(Object.keys(e)[0]);
    });
  }

  newRow() {
    let newRow = {};
    this.headers.forEach((h) => {
      newRow = { ...newRow, [h]: h };
    });
    this.rows.push(newRow);
    this.isEditing = true;
    this.enableEditIndex = this.rows.length - 1;
  }

  onChangeInput(event: any, header: string, index: number) {
    this.rows[index][header] = event.target.value;
  }

  onSaveRow() {
    event.preventDefault();
    const control = this.group.controls[this.config.name] as FormArray;
    control.removeAt(0);
    this.rows.forEach((r) => {
      this.group.controls[this.config.name].value.push(r);
    });
    this.isEditing = false;
  }

  onCancel() {
    this.isEditing = false;
  }

  emitIconButtonClick(action, i) {
    event.preventDefault();
    if (action === 'edit') {
      this.isEditing = true;
      this.enableEditIndex = i;
    } else {
      this.rows.splice(i, 1);
      this.onSaveRow();
    }
  }
}
