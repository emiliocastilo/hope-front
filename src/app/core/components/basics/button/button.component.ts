import { Component, Input } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass']
})
export class ButtonComponent implements ControlValueAccessor {

  @Input() id: String;
  @Input() texto: String;
  @Input() icono: String;
  @Input() clasesBtn: String;
  @Input() type: String = 'button';
  @Input() soloLectura = false;
  @Input() loading = false;

  childControl = new FormControl();

  writeValue(value: any): void {
    this.childControl.setValue(value);
  }
  registerOnChange(fn: (value: any) => void) {
    this.fn = fn;
  }

  registerOnTouched() { }

  fn = (value: any) => { }

  constructor(
    public _translate: TranslateService
  ) { }
}
