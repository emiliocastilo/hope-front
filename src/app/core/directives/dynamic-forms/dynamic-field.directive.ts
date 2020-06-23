import {
  Directive,
  Input,
  OnInit,
  ComponentFactoryResolver,
  ViewContainerRef,
  ComponentRef,
  HostBinding,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormButtonComponent } from '../../components/basics/form-button/form-button.component';
import { FormInputComponent } from '../../components/basics/form-input/form-input.component';
import { FormSelectComponent } from '../../components/basics/form-select/form-select.component';
import { Field } from '../../interfaces/dynamic-forms/field.interface';
import { FormCheckboxComponent } from '../../components/basics/form-checkbox/form-checkbox.component';
import { FormRadioComponent } from '../../components/basics/form-radio/form-radio.component';
import { FormSwitchComponent } from '../../components/basics/form-switch/form-switch.component';
import { FormDatepickerComponent } from '../../components/basics/form-datepicker/form-datepicker.component';
import { FormTextareaComponent } from '../../components/basics/form-textarea/form-textarea.component';
import { FromTitleComponent } from 'src/app/core/components/basics/from-title/from-title.component';
import { FromDividerComponent } from 'src/app/core/components/basics/from-divider/from-divider.component';
import { FieldConfig } from '../../interfaces/dynamic-forms/field-config.interface';
import { FormListComponent } from '../../components/basics/form-list/form-list.component';
// import { FormHistoricComponent } from '../../components/basics/form-historic/form-historic.component';

const components = {
  button: FormButtonComponent,
  input: FormInputComponent,
  select: FormSelectComponent,
  checkbox: FormCheckboxComponent,
  radio: FormRadioComponent,
  switch: FormSwitchComponent,
  datepicker: FormDatepickerComponent,
  textarea: FormTextareaComponent,
  title: FromTitleComponent,
  divider: FromDividerComponent,
  // historic: FormHistoricComponent,
  table: FormListComponent,
};

@Directive({
  selector: '[dynamicField]',
})
export class DynamicFieldDirective implements OnInit {
  @Input() config: FieldConfig;
  @Input() group: FormGroup;

  @HostBinding('class')
  elementClass = 'col-12';

  component: ComponentRef<Field>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit() {
    if (!components[this.config.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `ERROR: Tipo de campo no soportado (${this.config.type}).
        Supported types: ${supportedTypes}`
      );
    }
    const component = this.resolver.resolveComponentFactory<Field>(
      components[this.config.type]
    );
    this.component = this.container.createComponent(component);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }
}
