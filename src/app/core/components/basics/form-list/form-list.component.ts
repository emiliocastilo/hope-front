import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

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
  list = [];
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
    //  this.list.push({ name: '', surname: '' });
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
      this.list.push(event.value);
      modalRef.close();
    });
  }

  onChangeInput(event: any, header: string) {
    this.modalForm.value[header] = event.target.value;
  }

  onSaveRow(row: any) {
    event.preventDefault();
    this.isEditing = false;
  }

  emitIconButtonClick(action, i) {
    event.preventDefault();
    if (action === 'edit') {
      this.isEditing = true;
    } else {
      this.list.splice(i, 1);
    }
  }
}
