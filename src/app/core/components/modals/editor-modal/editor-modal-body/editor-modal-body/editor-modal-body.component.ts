import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-editor-modal-body',
  templateUrl: './editor-modal-body.component.html',
  styleUrls: ['./editor-modal-body.component.scss'],
})
export class EditorModalBodyComponent implements OnInit {
  @Input() id: string;
  @Input() form: FormGroup;
  @Input() options: any = {};
  public formKeys: Array<string> = [];

  constructor() {}

  ngOnInit(): void {
    if (this.form) {
      this.formKeys = Object.keys(this.form.controls);
    }
  }

  public setType(key: string) {
    const types = {
      birthDate: 'date',
      startPeriod: 'date',
      endPeriod: 'date',
      fileDispensation: 'file',
      hospital: 'select',
      serviceDTO: 'select',
    };
    return types[key] ? types[key] : 'text';
  }

  public setAccept(key: string) {
    const types = {
      fileDispensation: '.csv',
    };

    return types[key] ? types[key] : null;
  }
}
