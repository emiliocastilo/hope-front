import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-questionnaire-analysis-artritis-psoriasica',
  templateUrl: './questionnaire-analysis-artritis-psoriasica.component.html',
  styleUrls: ['./questionnaire-analysis-artritis-psoriasica.component.scss'],
})
export class QuestionnaireAnalysisArtritisPsoriasicaComponent implements OnInit {
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();
  public form: FormGroup;
  public formKeys: Array<string> = [];
  public showRequiredLegend: boolean = false;
  public questions = [];
  public repliesValues = [1, 2, 3, 4, 5];

  constructor(
    private _formBuilder: FormBuilder,
    public _translate: TranslateService
  ) {}

  ngOnInit() {
    this.form = this._formBuilder.group({
      question1: [''],
      question2: [''],
      question3: [''],
      question4: [''],
      question5: [''],
      question6: [''],
      question7: [''],
      question8: [''],
      question9: [''],
      question10: [''],
      question11: [''],
      question12: [''],
      question13: [''],
      question14: [''],
      question15: [''],
      valuationSymptoms: [''],
      valuationFunctional: [''],
      paseScoreTotal: [''],
    });

    this.questions.push('questionnaire-analysis-artritis-psoriasica.question-1');
    this.questions.push('questionnaire-analysis-artritis-psoriasica.question-2');
    this.questions.push('questionnaire-analysis-artritis-psoriasica.question-3');
    this.questions.push('questionnaire-analysis-artritis-psoriasica.question-4');
    this.questions.push('questionnaire-analysis-artritis-psoriasica.question-5');
    this.questions.push('questionnaire-analysis-artritis-psoriasica.question-6');
    this.questions.push('questionnaire-analysis-artritis-psoriasica.question-7');
    this.questions.push('questionnaire-analysis-artritis-psoriasica.question-8');
    this.questions.push('questionnaire-analysis-artritis-psoriasica.question-9');
    this.questions.push('questionnaire-analysis-artritis-psoriasica.question-10');
    this.questions.push('questionnaire-analysis-artritis-psoriasica.question-11');
    this.questions.push('questionnaire-analysis-artritis-psoriasica.question-12');
    this.questions.push('questionnaire-analysis-artritis-psoriasica.question-13');
    this.questions.push('questionnaire-analysis-artritis-psoriasica.question-14');
    this.questions.push('questionnaire-analysis-artritis-psoriasica.question-15');

    if (this.form) {
      this.formKeys = Object.keys(this.form.controls);
      this.checkAnyRequired(this.formKeys);
    }
  }

  public checkIfRequired(key: string) {
    let isRequired: boolean = false;

    const field = this.form.get(key);

    if (field.validator) {
      if (field.validator({} as any)) {
        isRequired = field.validator({} as any).required;
      }
    }

    return isRequired;
  }

  public getType(formKey: string): string {
    let type = 'text';
    const key = formKey.toLowerCase();

    if (key.includes('date') || key.includes('period')) {
      type = 'date';
    }

    if (key.includes('phone') || key.includes('order')) {
      type = 'number';
    }

    if (key.includes('password')) {
      type = 'password';
    }
    return type;
  }

  getInvalidLabel(formKey: string): string {
    const errors = this.form ? this.form.get(formKey).errors : undefined;
    const label = errors
      ? Object.keys(errors).filter((key: string) => errors[key])
      : undefined;
    return label ? `form.validate.${label[0]}` : 'form.validate.required';
  }

  public checkAnyRequired(keys: Array<string>) {
    keys.forEach((key) => {
      const field = this.form.get(key);

      if (field.validator) {
        if (field.validator({} as any)) {
          if (field.validator({} as any).required) {
            this.showRequiredLegend = true;
          }
        }
      }
    });
  }

  public changeValue() {
    let valueSymptoms = 0;
    let valueFunctional = 0;
    let valuePase = 0;
    let currentValue = 0;
    for (let i = 1; i <= 7; i++) {
      currentValue = parseInt(this.form.controls['question' + i].value);
      if (!isNaN(currentValue)) {
        valueSymptoms += currentValue;
      }

    }

    for (let i = 8; i <= 15; i++) {
      currentValue = parseInt(this.form.controls['question' + i].value);
      if (!isNaN(currentValue)) {
        valueFunctional += currentValue;
      }
    }

    valuePase = valueSymptoms + valueFunctional;

    this.form.controls['valuationSymptoms'].setValue(valueSymptoms);

    this.form.controls['valuationFunctional'].setValue(valueFunctional);

    this.form.controls['paseScoreTotal'].setValue(valuePase);
  }

  public invalidForm() {
    return this.form.invalid;
  }

  public onClose() {
    this.close.emit(null);
  }

  public onSave() {
    const values = {
      symptoms: this.form.controls['valuationSymptoms'].value,
      functional: this.form.controls['valuationFunctional'].value,
      pasetotal: this.form.controls['paseScoreTotal'].value
    }
    this.save.emit(values);
  }
}
