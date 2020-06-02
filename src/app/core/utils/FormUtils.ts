import { FieldConfig } from '../interfaces/dynamic-forms/field-config.interface';
import { FieldConfigModel } from '../models/forms/field-config.model';
import StringUtils from './StringUtils';

export default class FormUtils {
  static createFieldConfig(form, filled?): FieldConfig[] {
    const fieldConfig: FieldConfig[] = [];
    if (filled && filled.length > 0) {
      this.fillFormWithValues(form, filled);
    }
    for (const key in form) {
      fieldConfig.push(FormUtils.convertJSONToFieldConfig(form[key]));
    }
    return fieldConfig;
  }

  static convertJSONToFieldConfig(value): FieldConfig {
    const fieldConfig: FieldConfig = new FieldConfigModel();
    fieldConfig.name = value.name;
    fieldConfig.type = value.type;
    fieldConfig.disabled = value.disabled;
    fieldConfig.label = value.label;
    fieldConfig.options = value.options;
    fieldConfig.placeholder = value.placeholder;
    fieldConfig.value = value.value;
    fieldConfig.icon = value.icon;
    fieldConfig.selectMultiple = value.selectMultiple;
    fieldConfig.radioButton = value.radioButton;
    fieldConfig.rows = value.rows;
    fieldConfig.inputType = value.inputType;
    // TODO: PARSEAR validaciones, no pueden venir como tal,habrá que hacer un switch case o algo así.
    // if (value.validation) {
    //     const validations = StringUtils.stringToArray(value.validation);
    //     validations.forEach(element => {
    //         fieldConfig.validation.push(element);
    //     });
    //     fieldConfig.validation = value.validation;
    // }
    return fieldConfig;
  }

  static fillFormWithValues(form, filled) {
    form.forEach((element) => {
      filled.forEach((e) => {
        if (element.name === e.name) {
          element.value = e.value;
        }
      });
    });
  }

  static parseEntriesForm(values: any) {
    const form = [];
    Object.entries(values).forEach((e) => {
      const entry = {
        name: e[0],
        value: e[1],
      };
      form.push(entry);
    });
    return form;
  }
}
