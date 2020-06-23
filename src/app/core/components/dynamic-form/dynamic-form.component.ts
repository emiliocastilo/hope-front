import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FieldConfig } from '../../interfaces/dynamic-forms/field-config.interface';
import FormUtils from '../../utils/FormUtils';
import { NotificationService } from '../../services/notification.service';

@Component({
  exportAs: 'dynamicForm',
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnChanges, OnInit {
  @Input() config: FieldConfig[] = [];
  @Input() buttons: string[] = [];
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;

  get controls() {
    return this.config.filter(({ type }) => type !== 'button');
  }
  get changes() {
    return this.form.valueChanges;
  }
  get valid() {
    return this.form.valid;
  }
  get value() {
    return this.form.value;
  }

  constructor(
    private fb: FormBuilder,
    private _notification: NotificationService
  ) {}

  ngOnInit() {
    this.form = this.createGroup();
  }

  detectCalculated() {
    this.changes.subscribe((change) => {
      const calculatedFields = this.config.filter((e) => e.calculated_front);
      const params = [];
      if (calculatedFields.length > 0) {
        calculatedFields.forEach((field) => {
          field.params.forEach((e, i) => {
            params[i] = change[e];
          });
          const value = FormUtils[field.formula](params);
          this.form.controls[field.name].setValue(value ? value : '', {
            emitEvent: false,
          });
        });
      }
    });
  }

  ngOnChanges() {
    if (this.form) {
      const controls = Object.keys(this.form.controls);
      const configControls = this.controls.map((item) => item.name);

      controls
        .filter((control) => !configControls.includes(control))
        .forEach((control) => this.form.removeControl(control));

      configControls
        .filter((control) => !controls.includes(control))
        .forEach((name) => {
          const config = this.config.find((control) => control.name === name);
          if (config.type !== 'title' && config.type !== 'table') {
            this.form.addControl(name, this.createControl(config));
          }
          if (config.type === 'table') {
            this.form.addControl(name, this.createArray(config));
          }
        });
      this.detectCalculated();
    }
  }

  createGroup() {
    const group = this.fb.group({});
    this.controls.forEach((control) =>
      group.addControl(control.name, this.createControl(control))
    );
    return group;
  }

  createControl(config: FieldConfig) {
    const { disabled, validation, value } = config;
    return this.fb.control({ disabled, value }, validation);
  }

  createArray(config: FieldConfig) {
    const group = this.fb.group({});
    config.fields.forEach((field) => {
      group.addControl(field.name, this.fb.control(''));
    });
    return this.fb.array([group]);
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.valid) {
      this.submit.emit(this.value);
    } else {
      this.submit.emit(null);
    }
  }

  cleanClick(event: Event) {
    this.controls.forEach((control) => {
      if (control.type != 'title' && !control.disabled) {
        this.form.controls[control.name].setValue('');
      }
    });
  }

  setDisabled(name: string, disable: boolean) {
    if (this.form.controls[name]) {
      const method = disable ? 'disable' : 'enable';
      this.form.controls[name][method]();
      return;
    }

    this.config = this.config.map((item) => {
      if (item.name === name) {
        item.disabled = disable;
      }
      return item;
    });
  }

  setValue(name: string, value: any) {
    this.form.controls[name].setValue(value, { emitEvent: true });
  }
}
