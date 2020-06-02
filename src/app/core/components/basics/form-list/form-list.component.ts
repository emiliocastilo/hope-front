import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

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

  ngOnInit() {
    this.config.columns.forEach((e) => {
      this.headers.push(Object.keys(e)[0]);
    });
  }

  newRow() {
    // TODO open modal and add entry

    let row = {};
    this.headers.forEach((h) => (row = { ...row, [h]: 'test' }));
    this.rows.push(row);
  }

  emitIconButtonClick(action, index) {
    console.log('button');
  }
}
