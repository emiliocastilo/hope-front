import { FieldConfig } from '../interfaces/dynamic-forms/field-config.interface';
import { FieldConfigModel } from '../models/forms/field-config.model';
import moment from 'moment';
import StringUtils from './StringUtils';
import { ValidatorFn, Validators } from '@angular/forms';

export default class FormUtils {
    static decimalPattern: string = '^[0-9]+(.[0-9]{1,valueToReplace})?$';

    static createFieldConfig(form, filled?): FieldConfig[] {
        const fieldConfig: FieldConfig[] = [];
        let isFormFilled: boolean = filled && filled.length > 0;
        if (isFormFilled) {
            this.fillFormWithValues(form, filled);
        }
        for (const key in form) {
            fieldConfig.push(FormUtils.convertJSONToFieldConfig(form[key], isFormFilled));
        }
        return fieldConfig;
    }

    static createButtons(buttons): string[] {
        const buttonsArray: string[] = [];
        for (const key in buttons) {
            buttonsArray.push(buttons[key]);
        }
        return buttonsArray;
    }

    static convertJSONToFieldConfig(value, isFormFilled): FieldConfig {
        const fieldConfig: FieldConfig = new FieldConfigModel();
        fieldConfig.name = value.name;
        fieldConfig.type = value.type;
        fieldConfig.disabled = value.disabled;
        fieldConfig.label = value.label;
        fieldConfig.options = value.options;
        fieldConfig.placeholder = value.placeholder;
        // meter propieddad defaulvalue y quitar el value type checkbox
        fieldConfig.value = this.configDefautlValue(value, isFormFilled);

        fieldConfig.icon = value.icon;
        fieldConfig.selectMultiple = value.selectMultiple;
        fieldConfig.radioButton = value.radioButton;
        fieldConfig.labelCheckOff = value.labelCheckOff;
        fieldConfig.labelCheckOn = value.labelCheckOn;
        fieldConfig.rows = value.rows;
        fieldConfig.inputType = value.inputType;
        fieldConfig.formula = value.formula;
        fieldConfig.params = value.params;
        fieldConfig.max = value.max ? value.max : '';
        fieldConfig.min = value.min ? value.min : '';
        fieldConfig.actions = value.actions;
        fieldConfig.columns = value.columns;
        fieldConfig.fields = value.fields;
        fieldConfig.button_click = value.button_click;
        fieldConfig.calculated_front = value.calculated_front;
        fieldConfig.endpoint = value.endpoint;
        fieldConfig.event = value.event;
        fieldConfig.graphBack = value.graphBack;
        fieldConfig.calculated_back = value.calculated_back;
        fieldConfig.historic = value.historic;
        fieldConfig.enableWhen = value.enableWhen;
        fieldConfig.hiddenWhen = value.hiddenWhen;
        fieldConfig.hidden = value.hidden;
        fieldConfig.button = value.button;
        fieldConfig.template = value.template;
        fieldConfig.css = value.css;
        fieldConfig.readonly = value.readonly;

        fieldConfig.multiselect = value.multiselect;

        if (value.validation) {
            const validations = StringUtils.stringToArray(value.validation);
            fieldConfig.validation = this.parseValidations(validations);
        }
        return fieldConfig;
    }

    static parseValidations(validation: string[]): ValidatorFn[] {
        const finalValidators: any[] = [];
        validation.forEach((element) => {
            // Required
            if (element.trim() === 'Validators.required') {
                finalValidators.push(Validators.required);
            }
            // Min length
            if (element.trim().startsWith('Validators.minLength')) {
                finalValidators.push(Validators.minLength(parseInt(StringUtils.getParenthesisValue(element))));
            }
            // Max length
            if (element.trim().startsWith('Validators.maxLength')) {
                finalValidators.push(Validators.maxLength(parseInt(StringUtils.getParenthesisValue(element))));
            }
            // Pattern
            if (element.trim().startsWith('Validators.pattern')) {
                finalValidators.push(Validators.pattern(StringUtils.getParenthesisValue(element)));
            }
            // email
            if (element.trim().startsWith('Validators.email')) {
                finalValidators.push(Validators.email);
            }
            // decimal
            if (element.trim().startsWith('Validators.decimal')) {
                finalValidators.push(Validators.pattern(this.parseValueIntoPattern(this.decimalPattern, StringUtils.getParenthesisValue(element))));
            }
            // dni
            // if (element.trim().startsWith("Validators.dni")){
            //   finalValidators.push(Validators.pattern('^[a-z]{3}[0-9]{6}[a-z]?$'));
            // }
        });
        return finalValidators;
    }

    static configDefautlValue(value, isFormFilled) {
        if (!isFormFilled && value.defaultValue) {
            switch (value.type) {
                case 'datepicker':
                    if (value.defaultValue === 'today') {
                        return moment(new Date()).format('YYYY-MM-DD');
                    } else {
                        return value.defaultValue;
                    }
                    break;
                default:
                    return value.defaultValue;
                    break;
            }
        } else {
            return value.value;
        }
    }

    static parseValueIntoPattern(decimalPattern: string, value: string): string {
        return value ? decimalPattern.replace('valueToReplace', value) : decimalPattern.replace('valueToReplace', '2');
    }

    static fillFormWithValues(form, filled) {
        form.forEach((element) => {
            filled.forEach((e) => {
                if (element.name === e.name) {
                    element.value = e.value;
                    if (e.type === 'historic') {
                        element.historic = e.value;
                    }
                }
            });
        });
    }

    static parseEntriesForm(values: any, config: any) {
        const form = [];
        Object.entries(values).forEach((e: any) => {
            config.forEach((field: any) => {
                if (field.name === e[0]) {
                    // no se borra de momento porque en las tablas que su name contenga table se hacia una causitica
                    // especifica para no romper el resto de formularios y se queda de momento asi porque no es necesario
                    const entry = {
                        type: field.type,
                        name: e[0],
                        value: e[1],
                        // e[0].toLowerCase().includes('table')
                        // ? JSON.stringify(e[1])
                        // : e[1],
                    };
                    form.push(entry);
                }
            });
        });
        return form;
    }

    static formatDataMultiGraph(translate, formKeys, keyTranslation, retrievedFormFormat) {
        const parseData = [];

        for (const key of formKeys) {
            if (!key.includes('date')) {
                const object = {
                    name: translate.instant(`${keyTranslation}.${key}`.toLowerCase()),
                    values: this.parseIsoToDate(retrievedFormFormat[key]),
                };
                if (object.values.length > 0) {
                    parseData.push(object);
                }
            }
        }
        return parseData;
    }

    static parseIsoToDate(array: any[]): any[] {
        if (!array) {
            return [];
        }
        const parseArrayData = array.map((object: any) => {
            if (object.value) {
                object.date = object.date ? new Date(object.date) : object.date;
                return object;
            }
        });
        return parseArrayData;
    }

    static ageBybirthdate(params: Array<any>) {
        return moment().diff(params[0], 'years');
    }

    static calculateIMC(params: Array<any>) {
        const imc = params[0] / (params[1] * params[1]);
        return isNaN(imc) ? '' : imc.toFixed(2);
    }

    static clasificationIMC(params: Array<any>) {
        if (!params[0] || !params[1]) {
            return '';
        }
        const imc = parseFloat(this.calculateIMC(params));
        if (imc >= 30) {
            return 'Obesidad';
        } else if (imc >= 25) {
            return 'Sobrepeso';
        } else if (imc >= 18.5 && imc <= 24.99) {
            return 'Normal';
        } else if (imc < 18.5) {
            return 'Bajo peso';
        }

        return '';
    }

    static calculateDlqi(params: Array<any>) {
        let total = 0;
        params.forEach((p) => {
            const score = parseInt(p, 10);
            if (score) {
                total = total + score;
            }
        });

        return total;
    }

    static clasificationDlqi(params: Array<any>) {
        const score = params[0];

        if (!score) {
            return '';
        }
        if (score >= 21) {
            return 'severa-grave';
        } else if (score >= 11 && score < 21) {
            return 'severa';
        } else if (score >= 6 && score < 11) {
            return 'moderada';
        } else if (score >= 2 && score < 6) {
            return 'leve';
        } else if (score === 1) {
            return 'blanqueado';
        }

        return '';
    }

    static calculateBodyArea(params: Array<any>) {
        const weight = Math.pow(params[0], 0.425);
        const height = Math.pow(params[1], 0.725);
        const bodyArea = (0.7184 * height * weight) / 100;
        return isNaN(bodyArea) ? '' : bodyArea.toFixed(2);
    }

    static cigarettesToYear(params: Array<any>) {
        return params[0] * 365;
    }

    static yearsWithoutSmoking(params: Array<any>) {
        if (!params[0]) {
            return '';
        }
        const date = moment(params[0], 'YYYY-MM-DD');
        const currentDate = moment();
        const diff = currentDate.diff(date, 'years', true);
        return diff.toFixed(2);
    }

    static clean(form: any): any {
        form.forEach((element) => {
            if (!element.disabled) {
                element.value = '';
            }
        });
        return form;
    }

    static moriskyAdherence(params: Array<any>): any {
        let cont = 0;

        if (!params[4]) {
            return cont.toString();
        }

        if (!params[0]) {
            cont++;
        }

        if (params[1]) {
            cont++;
        }

        if (!params[2]) {
            cont++;
        }

        if (params[3]) {
            cont++;
        }
        return cont;
    }

    static moriskyAssessment(params: Array<any>): any {
        if (params[0] === false && params[1] === true && params[2] === false && params[3] === true) {
            return 'Adherente';
        }
        return 'No adherente';
    }

    static haynesAdherence(params: Array<any>): any {
        if (params[1] === true) {
            if (!params[2]) {
                return '';
            }
            return `${((100 / params[0]) * params[2]).toFixed(2)}`;
        }

        if (params[0] && !params[1]) {
            return '100';
        }

        return '';
    }

    static haynesAssessment(params: Array<any>): any {
        if (params[0] && !params[1]) {
            return 'Adherente';
        } else {
            const value = this.haynesAdherence(params).replace('%', '');
            if (value && value >= 80 && value <= 100) {
                return 'Adherente';
            } else if (value && value < 80) {
                return 'No adherente';
            }
        }

        return '';
    }

    static furWeeks(params: Array<any>): any {
        var currentDate = moment();
        var date = moment(params[0]);
        return currentDate.diff(date, 'weeks');
    }

    static furBirthDate(params: Array<any>): any {
        let date = moment(params[0]);
        return date.add(280, 'days').format('DD/MM/YYYY');
    }

    static mutationsAdd(params: Array<any>): any {
        return params;
    }

    //TODO: los casos del switch, se dejan así porque están así en plantilla, cuando tengamos la patología casi cerrada convendría modificarlos por valores y no textos.
    static stadiumClassification(params: Array<any>): any {
        let categoria: string = '';
        switch (params[1]) {
            case 'Infección aguda asintomática o LPG':
                categoria = 'A';
                break;
            case 'Infección sintomática no A no C':
                categoria = 'B';
                break;
            case 'Procesos incluidos en la definición de SIDA':
                categoria = 'C';
                break;
        }
        switch (params[0]) {
            case 'Linfocitos CD4 mayor o igual a 500/mm3 o mayor que 29%':
                categoria = categoria + '1';
                break;
            case 'Linfocitos CD4 entre 200 y 499/mm3 o entre 14-28%':
                categoria = categoria + '2';
                break;
            case 'Linfocitos CD4 menor de 200/mm3 o menor de 14%':
                categoria = categoria + '3';
                break;
        }
        if (categoria.length < 2) {
            return ' ';
        } else {
            return categoria;
        }
    }
}
