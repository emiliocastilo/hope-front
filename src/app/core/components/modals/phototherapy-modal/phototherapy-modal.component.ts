import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-phototherapy-modal',
  templateUrl: './phototherapy-modal.component.html',
  styleUrls: ['./phototherapy-modal.component.scss'],
})
export class PhototherapyModalComponent implements OnInit {
  @Input() type: string;
  @Input() title: string;
  @Input() form: FormGroup;
  @Input() options: any[];
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() update: EventEmitter<any> = new EventEmitter();
  public formKeys: string[] = [];
  public showRequiredLegend: boolean = false;

  constructor() {}

  get validForm(): boolean {
    return this.form.valid;
  }

  ngOnInit(): void {
    console.log(this.options, this.type, this.form);
    this.formKeys = Object.keys(this.form.controls);
    this.showRequiredLegend = this.checkIfThereRequiredField();
  }

  public onSave() {
    if (this.validForm) {
      this.save.emit(this.form);
    }
  }

  public onUpdate() {
    if (this.validForm) {
      this.update.emit(this.form);
    }
  }

  public onClose() {
    this.cancel.emit(null);
  }

  public getInvalidLabel(formKey: string): string {
    const errors = this.form ? this.form.get(formKey).errors : undefined;
    const label = errors
      ? Object.keys(errors).filter((key: string) => errors[key])
      : undefined;
    return label ? `form.validate.${label[0]}` : 'form.validate.required';
  }

  public checkInputType(array: string[], type: string): boolean {
    return array.includes(type);
  }

  public checkIfRequired(key: string): boolean {
    let isRequired: boolean = false;

    const field = this.form.get(key);

    if (field.validator) {
      if (field.validator({} as any)) {
        isRequired = field.validator({} as any).required;
      }
    }

    return isRequired;
  }

  private checkIfThereRequiredField(): boolean {
    let pass = false;
    const count = this.formKeys.filter(
      (key: string) =>
        this.form.get(key) && this.form.get(key).validator({} as any).required
    );

    if (count.length > 0) {
      pass = true;
    }

    return pass;
  }
}
