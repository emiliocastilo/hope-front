import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editor-modal-body',
  templateUrl: './editor-modal-body.component.html',
  styleUrls: ['./editor-modal-body.component.scss'],
})
export class EditorModalBodyComponent implements OnInit {
  @Input() id: string;
  @Input() form: FormGroup;
  public formKeys: Array<string> = [];

  constructor() {}

  ngOnInit(): void {
    if (this.form) {
      this.formKeys = Object.keys(this.form.controls);
      // debugger;
    }
  }
}
