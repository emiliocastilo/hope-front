import { FieldConfig } from '../interfaces/dynamic-forms/field-config.interface';
import { FieldConfigModel } from '../models/forms/field-config.model';
import moment from 'moment';
import StringUtils from './StringUtils';
import { ValidatorFn, Validators, AbstractControl } from '@angular/forms';

export default class FormUtils {
  static decimalPattern: string = '^[0-9]+(.[0-9]{1,valueToReplace})?$';

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
    fieldConfig.labelCheckOff = value.labelCheckOff;
    fieldConfig.labelCheckOn = value.labelCheckOn;
    fieldConfig.rows = value.rows;
    fieldConfig.inputType = value.inputType;
    fieldConfig.formula = value.formula;
    fieldConfig.params = value.params;
    fieldConfig.actions = value.actions;
    fieldConfig.columns = value.columns;
    fieldConfig.fields = value.fields;
    fieldConfig.calculated_front = value.calculated_front;
    fieldConfig.historic = value.historic;
    if (value.validation) {
      const validations = StringUtils.stringToArray(value.validation);
      fieldConfig.validation = this.parseValidations(validations);
    }
    return fieldConfig;
  }

  static parseValidations(validation: string[]): ValidatorFn[] {
    let finalValidators: any[] = [];
    validation.forEach((element) => {
      //Required
      if (element.trim() === 'Validators.required') {
        finalValidators.push(Validators.required);
      }
      // Min length
      if (element.trim().startsWith('Validators.minLength')) {
        finalValidators.push(
          Validators.minLength(
            parseInt(StringUtils.getParenthesisValue(element))
          )
        );
      }
      // Max length
      if (element.trim().startsWith('Validators.maxLength')) {
        finalValidators.push(
          Validators.maxLength(
            parseInt(StringUtils.getParenthesisValue(element))
          )
        );
      }
      // Pattern
      if (element.trim().startsWith('Validators.pattern')) {
        finalValidators.push(
          Validators.pattern(StringUtils.getParenthesisValue(element))
        );
      }
      // email
      if (element.trim().startsWith('Validators.email')) {
        finalValidators.push(Validators.email);
      }
      // decimal
      if (element.trim().startsWith('Validators.decimal')) {
        finalValidators.push(
          Validators.pattern(
            this.parseValueIntoPattern(
              this.decimalPattern,
              StringUtils.getParenthesisValue(element)
            )
          )
        );
      }

      // dni
      // if (element.trim().startsWith("Validators.dni")){
      //   finalValidators.push(Validators.pattern('^[a-z]{3}[0-9]{6}[a-z]?$'));
      // }
    });
    return finalValidators;
  }
  static parseValueIntoPattern(decimalPattern: string, value: string): string {
    return value
      ? decimalPattern.replace('valueToReplace', value)
      : decimalPattern.replace('valueToReplace', '2');
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
        value: e[0].toLowerCase().includes('table')
          ? JSON.stringify(e[1])
          : e[1],
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
    return isNaN(imc) ? 0 : imc.toFixed(2);
  }

  static calculateBodyArea(params: Array<any>) {
    const weight = Math.pow(params[0], 0.425);
    const height = Math.pow(params[1], 0.725);
    const bodyArea = (0.7184 * height * weight) / 100;
    return isNaN(bodyArea) ? 0 : bodyArea.toFixed(2);
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
