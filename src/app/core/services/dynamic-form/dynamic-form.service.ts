import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { FieldConfig } from '../../interfaces/dynamic-forms/field-config.interface';
import FormUtils from '../../utils/FormUtils';

@Injectable({
    providedIn: 'root',
})
export class DynamicFormService {
    public form: FormGroup;
    public formSubject = new Subject<FormGroup>();

    constructor(private formBuilder: FormBuilder) {}

    public getForm() {
        if (!this.form) this.form = new FormGroup({});
        return this.formSubject.asObservable();
    }

    public setForm(form: FormGroup) {
        this.form = form;
        this.formSubject.next(form);
    }

    public addControls(controls: FieldConfig[], config: FieldConfig[]) {
        controls.forEach((control) => {
            if (this.form.controls[control.name] === undefined) this.form.addControl(control.name, this.createControl(control, config));
        });
        this.setForm(this.form);
    }

    public createControl(fieldConfig: FieldConfig, config: FieldConfig[]) {
        if (fieldConfig.calculated_front) {
            const params = [];
            fieldConfig.params.forEach((e, i) => {
                // Diferenciamos para los calculated front según si es nuevo (carga defaultValues) o no
                params[i] = this.form ? this.form.getRawValue()[e] : config[i].value;
            });

            fieldConfig.value = FormUtils[fieldConfig.formula](params);
        }
        const { disabled, validation, value } = fieldConfig;
        return this.formBuilder.control({ disabled: disabled, value: value }, validation);
    }
}
