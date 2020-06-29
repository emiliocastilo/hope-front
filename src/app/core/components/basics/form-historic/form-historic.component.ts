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

  constructor() {}

  ngOnInit(): void {
    this.recoverHistoric();
  }

  recoverHistoric() {
    setTimeout(() => {
      this.config.historic.forEach((e) => {
        const control = this.group.controls[this.config.name] as FormArray;
        control.removeAt(0);
        this.group.controls[this.config.name].value.push(e);
      });
    }, 1000);
    this.oldValue =
      this.config.historic && this.config.historic.length > 0
        ? this.config.historic[this.config.historic.length - 1].value
        : '';
  }

  bindToForm(field: any) {
    const isDatePicked = this.group.value['date'][0].date;
    if (!this.oldValue) {
      const control = this.group.controls[this.config.name] as FormArray;
      control.removeAt(0);
    }
    if (isDatePicked) {
      field = { ...field, date: isDatePicked };
    }
    this.group.controls[this.config.name].value.push(field);
  }

  onChange(event: any, name: string) {
    let selectedDate, selectedValue;
    if (name.includes('date')) {
      selectedDate = new Date(event.target.value).toISOString();
    } else {
      selectedValue = event.target.value;
    }
    this.bindToForm({
      date: selectedDate,
      value: selectedValue ? selectedValue : event.target.value,
    });
  }
}
