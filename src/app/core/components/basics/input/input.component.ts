import { Component, Input, Self, OnInit } from '@angular/core';
import { FormControl, ControlValueAccessor, NgControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass'],
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() label: String = '';
  @Input() maxlength: any = 256;
  @Input() type: String = 'text';
  @Input() id: String;
  @Input() required: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() placeholder: string = '';
  @Input() clases: String;

  value: string;
  onChange = (_: any) => {};
  onTouch = () => {};

  childControl = new FormControl();

  ngOnInit() {
    this.controlDirective.control.setValidators([this.validate.bind(this)]);
    this.controlDirective.control.updateValueAndValidity();
  }

  onInput(value: string) {
    this.value = value;
    this.onTouch();
    this.onChange(this.value);
  }

  writeValue(value: any): void {
    if (value) {
      this.value = value || '';
    } else {
      this.value = '';
    }

    this.childControl.setValue(value);
  }

  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  validate({ value }: FormControl) {
    const isNotValid =
      this.value == '' || this.value == undefined || this.value == null;
    return (
      isNotValid && {
        invalid: true,
      }
    );
  }

  constructor(
    public _translate: TranslateService,
    @Self() private controlDirective: NgControl
  ) {
    controlDirective.valueAccessor = this;
  }
}
