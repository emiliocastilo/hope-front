import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RolModel } from 'src/app/modules/management/models/rol.model';

@Component({
  selector: 'app-editor-modal',
  templateUrl: './editor-modal.component.html',
  styleUrls: ['./editor-modal.component.scss'],
})
export class EditorModalComponent implements OnInit {
  @Input() id: string;
  @Input() title: string;
  @Input() activeRoles: Array<RolModel>;
  @Input() form: FormGroup;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<FormGroup> = new EventEmitter();
  @Input() options: any = {};
  @Input() maxDate: string;
  public type: string = 'lg';

  constructor() {}

  ngOnInit(): void {}

  public onClose() {
    this.close.emit(null);
  }

  public onSave() {
    this.save.emit(this.form);
  }

  get validForm(): boolean {
    return this.form.valid;
  }
}
