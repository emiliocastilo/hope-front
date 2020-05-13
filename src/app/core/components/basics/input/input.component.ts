import { Component, Input, Self, OnInit } from '@angular/core';
import { FormControl, ControlValueAccessor, NgControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit, ControlValueAccessor {
  constructor(
    public _translate: TranslateService,
    @Self() private controlDirective: NgControl
  ) {
    controlDirective.valueAccessor = this;
  }
  @Input() clases: string;
  @Input() id: string;
  @Input() isDisabled = false;
  @Input() label = '';
  @Input() maxlength: any = 256;
  @Input() name: string;
  @Input() placeholder = '';
  @Input() required = false;
  @Input() type = 'text';
  @Input() invalidLabel: string;

  @Input() value: string;

  childControl = new FormControl();
  onChange = (_: any) => {};
  onTouch = () => {};

  ngOnInit() {
    // this.controlDirective.control.setValidators([this.validate.bind(this)]);
    // this.controlDirective.control.updateValueAndValidity();
    // console.log(this.controlDirective.control);
  }

  onInput(value: string) {
    this.value = value;
    this.onTouch();
    this.onChange(this.value);
    console.log(this.controlDirective.control.valid);
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

  get invalid(): boolean {
    return !this.controlDirective.valid && this.controlDirective.dirty;
  }
  get validator(): string {
    return JSON.stringify(this.controlDirective.control.validator);
  }
}
