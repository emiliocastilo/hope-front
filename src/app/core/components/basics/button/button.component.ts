import { ControlValueAccessor, FormControl } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements ControlValueAccessor {
  @Input() clasesBtn: string;
  @Input() icono: string;
  @Input() id: string;
  @Input() loading = false;
  @Input() readOnly = false;
  @Input() texto: string;
  @Input() type = 'button';

  childControl = new FormControl();

  writeValue(value: any): void {
    this.childControl.setValue(value);
  }
  registerOnChange(fn: (value: any) => void) {
    this.fn = fn;
  }

  registerOnTouched() {}

  fn = (value: any) => {};

  constructor(public _translate: TranslateService) {}
}
