import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass']
})
export class InputComponent {

  @Input() label: String;
  @Input() maxlength: any = 256;
  @Input() type: String = 'text';
  @Input() id: String;
  @Input() soloLectura: boolean = false;
  @Input() requerido: boolean = false;
  @Input() obligatorio: String;
  @Input() msjAyuda: String;

  childControl = new FormControl();

  writeValue(value: any) {
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