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
  @Input() isDisabled: boolean = false;
  @Input() label: string = '';
  @Input() maxlength: any = 256;
  @Input() name: string;
  @Input() placeholder = '';
  @Input() required: boolean = false;
  @Input() type: string = 'text';
  @Input() accept: string;

  value: string;

  childControl = new FormControl();
  onChange = (_: any) => {};
  onTouch = () => {};

  ngOnInit() {
    this.controlDirective.control.setValidators([this.validate.bind(this)]);
    this.controlDirective.control.updateValueAndValidity();
  }

  onInput(value: string) {
    console.log('onInput: ', value);
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

  public handleFileInput(files: FileList) {
    if (this.type === 'file') {
      // const fileToUpload = files.item(0);
      // const fileExtension = fileToUpload.name.split('.').pop();
      // console.log("handleFileInput", files);
      // if (fileExtension === this.config.fileType) {
      //   this.group.value.fileDispensation = fileToUpload;
      //   this.showError = false;
      // } else {
      //   this.showError = true;
      //   this.group.value.fileDispensation = null;
      // }
    }
  }
}
