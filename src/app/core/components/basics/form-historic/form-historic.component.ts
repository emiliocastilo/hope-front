import { Component, OnInit } from '@angular/core';
import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-form-historic',
  templateUrl: './form-historic.component.html',
  styleUrls: ['./form-historic.component.scss'],
})
export class FormHistoricComponent implements OnInit {
  config: FieldConfig;
  group: FormGroup;
  oldValue: any;
  historicField: any;
  selectedDate: string;

  constructor() {}

  ngOnInit(): void {
    if (this.config.historic && this.config.historic.length > 0) {
      this.recoverHistoric();
    }
  }

  recoverHistoric() {
    setTimeout(() => {
      const control = this.group.controls[this.config.name] as FormArray;
      control.removeAt(0);
      this.config.historic.forEach((e) => {
        this.group.controls[this.config.name].value.push(e);
      });
    }, 1000);
    this.oldValue =
      this.config.historic && this.config.historic.length > 0
        ? this.config.historic[this.config.historic.length - 1].value
        : '';
  }

  bindToForm(field: any) {
    if (!this.oldValue) {
      const control = this.group.controls[this.config.name] as FormArray;
      control.removeAt(0);
    }
    field = { ...field, date: localStorage.getItem('historicDate') };
    this.group.controls[this.config.name].value.push(field);
  }

  onChange(event: any, name: string) {
    if (name.includes('date')) {
      this.onSelectDate(event);
    }
    this.bindToForm({
      date: localStorage.getItem('historicDate'),
      value: event.target.value,
    });
  }

  onSelectDate(event: any) {
    this.selectedDate = new Date(event.target.value).toISOString();
    localStorage.setItem('historicDate', this.selectedDate);
  }
}
