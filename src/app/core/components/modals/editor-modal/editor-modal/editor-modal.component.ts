import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';
import { UserModel } from 'src/app/core/models/user/user.model';

@Component({
  selector: 'app-editor-modal',
  templateUrl: './editor-modal.component.html',
  styleUrls: ['./editor-modal.component.scss'],
})
export class EditorModalComponent implements OnInit {
  @Input() id: string;
  @Input() title: string;
  @Input() formConfig: FieldConfig;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<FieldConfig> = new EventEmitter();
  public type: string = 'lg';

  constructor() {}

  ngOnInit(): void {}

  public onClose() {
    this.close.emit(null);
  }

  public onSave(value: any) {
    this.save.emit(value);
  }
}
