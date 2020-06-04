import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditorModalComponent } from '../../modals/editor-modal/editor-modal/editor-modal.component';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss'],
})
export class FormListComponent implements OnInit {
  config: FieldConfig;
  group: FormGroup;
  headers = [];
  modalForm: FormGroup;
  rows = [];
  isEditing = false;

  constructor(
    private _modalService: NgbModal,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.config.columns.forEach((e) => {
      this.headers.push(Object.keys(e)[0]);
    });
    this.modalForm = this._formBuilder.group({});
    this.headers.forEach((c) => {
      this.modalForm.addControl(c, this._formBuilder.control(''));
    });
  }

  newRow() {
    this.modalForm.reset();
    const modalRef = this._modalService.open(EditorModalComponent, {
      size: 'lg',
    });

    modalRef.componentInstance.title = 'Añadir registro';
    modalRef.componentInstance.form = this.modalForm;
    modalRef.componentInstance.close.subscribe((event) => {
      modalRef.close();
    });
    modalRef.componentInstance.save.subscribe((event) => {
      this.rows.push(event.value);
      modalRef.close();
    });
  }

  onSaveRow(row) {
    event.preventDefault();
    this.isEditing = false;
  }

  emitIconButtonClick(action, i) {
    event.preventDefault();
    if (action === 'edit') {
      this.isEditing = true;
    } else {
      this.rows.splice(i, 1);
    }
  }
}
