import { FieldConfig } from '../interfaces/dynamic-forms/field-config.interface';
import { FieldConfigModel } from '../models/forms/field-config.model';
import StringUtils from './StringUtils';
import moment from 'moment';

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
    fieldConfig.formula = value.formula;
    fieldConfig.params = value.params;
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

  static ageBybirthdate(params: Array<any>) {
    return moment().diff(params[0], 'years');
  }

  static calculateIMC(params: Array<any>) {
    const imc = params[0] / (params[1] * params[1]);
    return imc.toFixed(2);
  }

  static calculateBodyArea(params: Array<any>) {
    const weight = Math.pow(params[0], 0.425);
    const height = Math.pow(params[1], 0.725);
    const bodyArea = (0.7184 * height * weight) / 100;
    return bodyArea.toFixed(2);
  }

  static cigaretteToYear(params: Array<any>) {
    return params[0] * 365;
  }

  static yearsWithoutSmoking(params: Array<any>) {
    const date = moment(params[0], 'DD/MM/YYYY');
    const currentDate = moment();
    const diff = currentDate.diff(date, 'years', true);
    return diff.toFixed(2);
  }
}
