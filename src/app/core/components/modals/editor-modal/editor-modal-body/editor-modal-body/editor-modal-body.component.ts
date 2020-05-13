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
      console.log(this.form.controls);
      this.formKeys = Object.keys(this.form.controls);
    }
  }

  public showSelect(key: string) {
    const selectType = {
      hospital: true,
      serviceDTO: true,
    };
    return selectType[key];
  }

  public getType(formKey: string): string {
    let type = 'text';
    const key = formKey.toLowerCase();
    if (key.includes('date')) {
      type = 'date';
    }
    if (key.includes('number')) {
      type = 'number';
    }
    return type;
  }
}

// getInvalidLabel(formKey: string): string {
//   let invalidLabel = "mod"
//   switch(formKey){

//   }
// }
