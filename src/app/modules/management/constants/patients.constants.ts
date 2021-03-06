import { Validators } from '@angular/forms';
import { ColumnHeaderModel } from 'src/app/core/models/table/colum-header.model';

export const PATIENT_TABLE_HEADERS = [
  new ColumnHeaderModel('Nombre', 2),
  new ColumnHeaderModel('Nhc', 2),
  new ColumnHeaderModel('Tarjeta sanitaria', 2),
  new ColumnHeaderModel('Dni', 2),
  new ColumnHeaderModel('Teléfono', 2),
  new ColumnHeaderModel('Género', 1),
  new ColumnHeaderModel('Acciones', 1),
];

export const PATIENT_DERMA_HEADERS = [
  new ColumnHeaderModel('Nombre', 2),
  new ColumnHeaderModel('Nhc', 2),
  new ColumnHeaderModel('Tarjeta sanitaria', 2),
  new ColumnHeaderModel('Dni', 2),
  new ColumnHeaderModel('Teléfono', 2),
  new ColumnHeaderModel('Género', 2),
];
export const PATIENT_TABLE_KEYS = [
  'name',
  'firstSurname',
  'lastSurname',
  'nhc',
  'healthCard',
  'dni',
  // 'address',
  'phone',
  //  'email',
  //  'birthDate',
  // 'hospital',
  'genderCode',
];
export const PATIENT_FORM = [
  {
    type: 'input',
    label: 'modal.editor.field.name',
    name: 'name',
    placeholder: 'modal.editor.field.name',
    validation: [Validators.required, Validators.minLength(2)],
  },
  {
    type: 'input',
    label: 'modal.editor.field.firstSurname',
    name: 'firstSurname',
    placeholder: 'modal.editor.field.firstSurname',
    validation: [Validators.required, Validators.minLength(1)],
  },
  {
    type: 'input',
    label: 'modal.editor.field.lastSurname',
    name: 'lastSurname',
    placeholder: 'modal.editor.field.lastSurname',
    validation: [Validators.required, Validators.minLength(3)],
  },
  {
    type: 'input',
    label: 'modal.editor.field.nhc',
    name: 'nhc',
    placeholder: 'modal.editor.field.nhc',
    validation: [Validators.required],
  },
  {
    type: 'input',
    label: 'modal.editor.field.healthCard',
    name: 'healthCard',
    placeholder: 'modal.editor.field.healthCard',
    validation: [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(6),
    ],
  },
  {
    type: 'input',
    label: 'modal.editor.field.dni',
    name: 'dni',
    placeholder: 'modal.editor.field.dni',
    validation: [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(6),
    ],
  },
  {
    type: 'input',
    label: 'modal.editor.field.address',
    name: 'address',
    placeholder: 'modal.editor.field.address',
    validation: [Validators.required],
  },
  {
    type: 'input',
    label: 'modal.editor.field.phone',
    name: 'phone',
    placeholder: 'modal.editor.field.phone',
    validation: [Validators.required],
    inputType: 'number',
  },
  {
    type: 'input',
    label: 'modal.editor.field.email',
    name: 'email',
    placeholder: 'modal.editor.field.email',
    validation: [Validators.required, Validators.email],
  },
  {
    type: 'input',
    label: 'modal.editor.field.birthDate',
    name: 'birthDate',
    placeholder: 'modal.editor.field.birthDate',
    validation: [Validators.required],
    inputType: 'date',
  },
];
