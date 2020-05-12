import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
})
export class InputSelectComponent implements OnInit {
  @Input() id: string;
  @Input() isDisabled: boolean = false;
  @Input() labelValue: string = '';
  @Input() name: string;
  @Input() options: any[] = [];
  @Input() currentValue: any;
  @Input() placeholder: string = '';
  @Input() selectMultiple: boolean = false;

  public value: any = null;
  childControl = new FormControl();

  optionSelected: boolean;

  ngOnInit(): void {
    console.log('ngOnInit:', this.currentValue);
  }

  onChange(value: any): void {
    console.log('onSelect: ', this.currentValue, value);
    this.optionSelected = this.currentValue ? true : false;
  }

  onTouch = () => {};

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
}
