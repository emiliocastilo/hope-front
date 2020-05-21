import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RolModel } from 'src/app/modules/management/models/rol.model';

@Component({
  selector: 'app-editor-modal-body',
  templateUrl: './editor-modal-body.component.html',
  styleUrls: ['./editor-modal-body.component.scss'],
})
export class EditorModalBodyComponent implements OnInit {
  @Input() id: string;
  @Input() form: FormGroup;
  @Input() activeRoles: Array<RolModel>;
  @Input() options: any = {};
  @Input() validationLabels: Map<string, string>;
  public formKeys: Array<string> = [];

  constructor() {}

  ngOnInit(): void {
    if (this.form) {
      this.formKeys = Object.keys(this.form.controls);
    }
  }

  public setType(key: string) {
    const types = {
      birthDate: 'date',
      startPeriod: 'date',
      endPeriod: 'date',
      fileDispensation: 'file',
      hospital: 'select',
      serviceDTO: 'select',
    };
    return types[key] ? types[key] : 'text';
  }

  onRolSelected(event: string) {
    if (this.activeRoles.length > 0) {
      const indexRol = this.activeRoles.findIndex((rol) => rol.name === event);
      if (indexRol >= 0) {
        this.activeRoles.splice(indexRol, 1);
      } else {
        this.activeRoles.push(
          this.options.roles.find((rol) => rol.name === event)
        );
      }
    } else {
      this.activeRoles.push(
        this.options.roles.find((rol) => rol.name === event)
      );
    }
  }

  public setAccept(key: string) {
    const types = {
      fileDispensation: '.csv',
    };

    return types[key] ? types[key] : null;
  }

  public getType(formKey: string): string {
    let type = 'text';
    const key = formKey.toLowerCase();
    if (key.includes('date') || key.includes('period')) {
      type = 'date';
    }
    if (key.includes('number') || key.includes('phone')) {
      type = 'number';
    }
    return type;
  }

  getInvalidLabel(formKey: string): string {
    const label = this.validationLabels
      ? this.validationLabels.get(formKey)
      : undefined;
    return label ? label : 'form.validate.required';
  }
}
