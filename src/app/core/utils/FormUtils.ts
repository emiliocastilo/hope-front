import { FieldConfig } from '../interfaces/dynamic-forms/field-config.interface';
import { FieldConfigModel } from '../models/forms/field-config.model';
import StringUtils from './StringUtils';

export default class FormUtils {
  static createFieldConfig(form): FieldConfig[] {
    let fieldConfig: FieldConfig[] = [];
    for (let key in form) {
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
    //TODO: PARSEAR validaciones, no pueden venir como tal,habrá que hacer un switch case o algo así.
    // if (value.validation) {
    //     const validations = StringUtils.stringToArray(value.validation);
    //     validations.forEach(element => {
    //         fieldConfig.validation.push(element);
    //     });
    //     fieldConfig.validation = value.validation;
    // }
    return fieldConfig;
  }
}
