import { Component, OnInit } from '@angular/core';
import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-historic',
  templateUrl: './form-historic.component.html',
  styleUrls: ['./form-historic.component.scss'],
})
export class FormHistoricComponent implements OnInit {
  config: FieldConfig;
  group: FormGroup;
  oldValue: any;

  constructor() {}

  ngOnInit(): void {
    this.oldValue =
      this.config.historic && this.config.historic.length > 0
        ? this.config.historic[this.config.historic.length - 1].value
        : '';
  }

  onChange(event: any) {
    this.group.controls[this.config.name].setValue({
      date: new Date(),
      value: 55,
    });
  }
}
