import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, ControlValueAccessor, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
})
export class InputSelectComponent implements OnInit, ControlValueAccessor {
  constructor() {}

  @Input() id: string;
  @Input() isDisabled: boolean = false;
  @Input() labelValue: string = '';
  @Input() name: string;
  @Input() options: any[] = [];
  @Input() currentValue: any;
  @Input() placeholder: string = '';
  @Input() selectMultiple: boolean = false;
  @Input() clearAfterSelect: boolean = false;
  @Input() form: FormGroup;

  @Output() selectTrigger: EventEmitter<any> = new EventEmitter<any>();

  public value: string = null;
  childControl = new FormControl();

  optionSelected: boolean;

  ngOnInit(): void {
    if (this.currentValue && this.clearAfterSelect) {
      this.value = this.currentValue[0].name;
    }
  }

  onChange(value: any): void {
    this.optionSelected = this.currentValue ? true : false;
    this.selectTrigger.emit(value);
    if (this.clearAfterSelect && this.value) {
      this.writeValue('');
    }
  }

  writeValue(value: any): void {
    if (value) {
      this.value = value || '';
    } else {
      this.value = '';
    }
    this.childControl.setValue(value);
  }

  onTouch = () => {};

  onInput(value: any) {
    this.value = value;
    this.setCurrentValue(value, this.options);
    this.childControl.setValue(this.currentValue);
    if (this.form) {
      this.form.controls[this.id].setValue([this.currentValue]);
    }
    this.onChange(this.value);
    this.onTouch();
  }

  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setCurrentValue(name: string, objectArray: any[]) {
    objectArray.map((object: any) => {
      if (object.name == name) this.currentValue = object;
    });
  }
}
