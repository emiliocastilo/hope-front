import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';
import { UserModel } from 'src/app/core/models/user/user.model';

@Component({
  selector: 'app-editor-modal-body',
  templateUrl: './editor-modal-body.component.html',
  styleUrls: ['./editor-modal-body.component.scss'],
})
export class EditorModalBodyComponent implements OnInit {
  @Input() id: string;
  @Input() formConfig: FieldConfig[];
  @Output() submitBody: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public submitModalBody(formValue: any) {
    this.submitBody.emit(formValue);
  }
}
