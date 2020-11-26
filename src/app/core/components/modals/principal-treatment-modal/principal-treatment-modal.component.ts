import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-principal-treatment-modal',
  templateUrl: './principal-treatment-modal.component.html',
  styleUrls: ['./principal-treatment-modal.component.scss'],
})
export class PrincipalTreatmentModalComponent implements OnInit {
  @Input() type: string;
  @Input() title: string;
  @Input() form: FormGroup;
  @Input() options: any[];
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Output() selectInputTypeahead: EventEmitter<any> = new EventEmitter();
  @Output() selectDose: EventEmitter<any> = new EventEmitter();
  @Output() selectTreatmentType: EventEmitter<any> = new EventEmitter();
  @Output() selectTopicalType: EventEmitter<any> = new EventEmitter();

  public formKeys: string[] = [];
  public showRequiredLegend: boolean = false;

  constructor() {}

  get validForm(): boolean {
    return this.form.valid;
  }

  ngOnInit(): void {
    this.formKeys = Object.keys(this.form.controls);
    this.showRequiredLegend = this.checkIfThereRequiredField();
  }

  public onSave() {
    if (this.validForm) {
      this.save.emit(this.form);
    }
  }

  public onUpdate() {
    if (this.validForm) {
      this.update.emit(this.form);
    }
  }

  public onClose() {
    this.cancel.emit(null);
  }

  public isDisabled(formKey) {
    if (this.type === 'changeSuspend') {
      return (
        ['medicine', 'family', 'atc', 'cn', 'tract', 'indication'].indexOf(
          formKey
        ) > -1
      );
    } else {
      return (
        ['family', 'atc', 'cn', 'tract', 'indication'].indexOf(formKey) > -1
      );
    }
  }

  public selectInputTypeaheadModal(event) {
    this.selectInputTypeahead.emit(event);
  }

  public getInvalidLabel(formKey: string): string {
    const errors = this.form ? this.form.get(formKey).errors : undefined;
    const label = errors
      ? Object.keys(errors).filter((key: string) => errors[key])
      : undefined;
    return label ? `form.validate.${label[0]}` : 'form.validate.required';
  }

  public checkInputType(array: string[], type: string): boolean {
    return array.includes(type);
  }

  public checkIfRequired(key: string): boolean {
    let isRequired: boolean = false;

    const field = this.form.get(key);

    if (field.validator) {
      if (field.validator({} as any)) {
        isRequired = field.validator({} as any).required;
      }
    }

    return isRequired;
  }

  private checkIfThereRequiredField(): boolean {
    let pass = false;
    const count = this.formKeys.filter(
      (key: string) =>
        this.form.get(key) &&
        this.form.get(key).validator &&
        this.form.get(key).validator({} as any) &&
        this.form.get(key).validator({} as any).required
    );

    if (count.length > 0) {
      pass = true;
    }

    return pass;
  }

  public select(formKey, event) {
    if (formKey === 'dose') {
      this.selectDose.emit(event);
    }

    // Cuando cambiamos el tipo de tratamiento, seleccionamos el check de medicamento por defecto y limpiamos lo que hubiese en el formulario compartido.
    if (
      (formKey === 'treatmentType' && event.id === 'topical') ||
      (formKey === 'treatmentType' && event.id === 'BIOLOGICO') ||
      (formKey === 'treatmentType' && event.id === 'QUIMICO')
    ) {
      this.form.get('opcionMedicamento').setValue('opcionMedicamento');
      this.resetFields([
        'family',
        'atc',
        'cn',
        'tract',
        'medicine',
        'descripcionFormulaMagistral',
        'dosisFormulaMagistral',
      ]);
      this.selectTreatmentType.emit(event);
    }
  }

  checkTypeTreatment(key): boolean {
    let show = true;
    // Si estamos en cambiar o suspender
    // TODO: comparar si estamos en cambiar o suspender, si es así, deshabilitar/habilitar los campos correspondientes
    if (
      this.form.get('treatmentType') &&
      this.form.get('treatmentType').value
    ) {
      // this.resetFields(['descripcionFormulaMagistral','dosisFormulaMagistral']);
      // Si el tratamiento es biológico o químico, ocultamos los radios y los campos de formula magistral y los vaciamos
      if (
        this.form.get('treatmentType').value[0].id === 'QUIMICO' ||
        this.form.get('treatmentType').value[0].id === 'BIOLOGICO' ||
        this.form.get('treatmentType').value === 'QUIMICO' ||
        this.form.get('treatmentType').value === 'BIOLOGICO'
      ) {
        if (
          [
            'opcionFormulaMagistral',
            'opcionMedicamento',
            'descripcionFormulaMagistral',
            'dosisFormulaMagistral',
          ].indexOf(key) > -1
        ) {
          show = false;
        }
        // Activamos la validación de la opción medicamento, y desactivamos la de la fórmula magistral
        this.form.get('opcionFormulaMagistral').setValue('');
        this.form.get('opcionMedicamento').setValue('opcionMedicamento');
        // hemos seleccionado tratamiento topico
      } else {
        //Hemos seleccionado tratamiento topico y opcion medicamento
        if (this.form.get('opcionMedicamento').value === 'opcionMedicamento') {
          if (
            ['descripcionFormulaMagistral', 'dosisFormulaMagistral'].indexOf(
              key
            ) > -1
          ) {
            show = false;
          }
          //Hemos seleccionado tratamiento topico y opcion formula magistral
        } else if (
          this.form.get('opcionFormulaMagistral').value ===
          'opcionFormulaMagistral'
        ) {
          if (
            [
              'medicine',
              'family',
              'atc',
              'cn',
              'tract',
              'dose',
              'otherDosis',
            ].indexOf(key) > -1
          ) {
            show = false;
          }
        }
      }
      //Todavia no se ha seleccionado ningún tratamiento
    } else {
      if (['opcionFormulaMagistral', 'opcionMedicamento'].indexOf(key) > -1) {
        show = false;
      }
    }
    return show;
  }
  setRadioValues(key) {
    if (key === 'opcionFormulaMagistral') {
      this.form.get('opcionFormulaMagistral').setValue(key);
      this.form.get('opcionMedicamento').setValue('');
      this.resetFields([
        'family',
        'atc',
        'cn',
        'tract',
        'medicine',
        'dose',
        'otherDosis',
      ]);
    } else if (key === 'opcionMedicamento') {
      this.form.get('opcionFormulaMagistral').setValue('');
      this.form.get('opcionMedicamento').setValue(key);
      this.resetFields([
        'descripcionFormulaMagistral',
        'dosisFormulaMagistral',
      ]);
    }
    this.selectTopicalType.emit(key);
  }

  private resetFields(keys: any[]) {
    keys.forEach((key) => {
      this.form.get(key).reset('');
    });
  }
}
