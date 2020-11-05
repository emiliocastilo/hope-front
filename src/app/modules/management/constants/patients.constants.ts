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
    label: 'modal.editor.field.cp',
    name: 'cp',
    placeholder: 'modal.editor.field.cp',
    validation: [],
  },
  {
    type: 'input',
    label: 'modal.editor.field.province',
    name: 'province',
    placeholder: 'modal.editor.field.province',
    validation: [],
  },
  {
    type: 'input',
    label: 'modal.editor.field.origincountry',
    name: 'origincountry',
    placeholder: 'modal.editor.field.origincountry',
    validation: [],
  },
  {
    type: 'input',
    label: 'modal.editor.field.city',
    name: 'city',
    placeholder: 'modal.editor.field.city',
    validation: [],
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

export const COUNTRIES = [{'name':'Afganistán', 'id':'Afganistán'},{'name':'Islas Gland', 'id':'Islas Gland'},{'name':'Albania', 'id':'Albania'},{'name':'Alemania', 'id':'Alemania'},{'name':'Andorra', 'id':'Andorra'},{'name':'Angola', 'id':'Angola'},{'name':'Anguilla', 'id':'Anguilla'},{'name':'Antártida', 'id':'Antártida'},{'name':'Antigua y Barbuda', 'id':'Antigua y Barbuda'},{'name':'Antillas Holandesas', 'id':'Antillas Holandesas'},{'name':'Arabia Saudí', 'id':'Arabia Saudí'},{'name':'Argelia', 'id':'Argelia'},{'name':'Argentina', 'id':'Argentina'},{'name':'Armenia', 'id':'Armenia'},{'name':'Aruba', 'id':'Aruba'},{'name':'Australia', 'id':'Australia'},{'name':'Austria', 'id':'Austria'},{'name':'Azerbaiyán', 'id':'Azerbaiyán'},{'name':'Bahamas', 'id':'Bahamas'},{'name':'Bahréin', 'id':'Bahréin'},{'name':'Bangladesh', 'id':'Bangladesh'},{'name':'Barbados', 'id':'Barbados'},{'name':'Bielorrusia', 'id':'Bielorrusia'},{'name':'Bélgica', 'id':'Bélgica'},{'name':'Belice', 'id':'Belice'},{'name':'Benin', 'id':'Benin'},{'name':'Bermudas', 'id':'Bermudas'},{'name':'Bhután', 'id':'Bhután'},{'name':'Bolivia', 'id':'Bolivia'},{'name':'Bosnia y Herzegovina', 'id':'Bosnia y Herzegovina'},{'name':'Botsuana', 'id':'Botsuana'},{'name':'Isla Bouvet', 'id':'Isla Bouvet'},{'name':'Brasil', 'id':'Brasil'},{'name':'Brunéi', 'id':'Brunéi'},{'name':'Bulgaria', 'id':'Bulgaria'},{'name':'Burkina Faso', 'id':'Burkina Faso'},{'name':'Burundi', 'id':'Burundi'},{'name':'Cabo Verde', 'id':'Cabo Verde'},{'name':'Islas Caimán', 'id':'Islas Caimán'},{'name':'Camboya', 'id':'Camboya'},{'name':'Camerún', 'id':'Camerún'},{'name':'Canadá', 'id':'Canadá'},{'name':'República Centroafricana', 'id':'República Centroafricana'},{'name':'Chad', 'id':'Chad'},{'name':'República Checa', 'id':'República Checa'},{'name':'Chile', 'id':'Chile'},{'name':'China', 'id':'China'},{'name':'Chipre', 'id':'Chipre'},{'name':'Isla de Pascua', 'id':'Isla de Pascua'},{'name':'Ciudad del Vaticano', 'id':'Ciudad del Vaticano'},{'name':'Islas Cocos', 'id':'Islas Cocos'},{'name':'Colombia', 'id':'Colombia'},{'name':'Comoras', 'id':'Comoras'},{'name':'República Democrática del Congo', 'id':'República Democrática del Congo'},{'name':'Congo', 'id':'Congo'},{'name':'Islas Cook', 'id':'Islas Cook'},{'name':'Corea del Norte', 'id':'Corea del Norte'},{'name':'Corea del Sur', 'id':'Corea del Sur'},{'name':'Costa de Marfil', 'id':'Costa de Marfil'},{'name':'Costa Rica', 'id':'Costa Rica'},{'name':'Croacia', 'id':'Croacia'},{'name':'Cuba', 'id':'Cuba'},{'name':'Dinamarca', 'id':'Dinamarca'},{'name':'Dominica', 'id':'Dominica'},{'name':'República Dominicana', 'id':'República Dominicana'},{'name':'Ecuador', 'id':'Ecuador'},{'name':'Egipto', 'id':'Egipto'},{'name':'El Salvador', 'id':'El Salvador'},{'name':'Emiratos Árabes Unidos', 'id':'Emiratos Árabes Unidos'},{'name':'Eritrea', 'id':'Eritrea'},{'name':'Eslovaquia', 'id':'Eslovaquia'},{'name':'Eslovenia', 'id':'Eslovenia'},{'name':'España', 'id':'España'},{'name':'Islas ultramarinas de Estados Unidos', 'id':'Islas ultramarinas de Estados Unidos'},{'name':'Estados Unidos', 'id':'Estados Unidos'},{'name':'Estonia', 'id':'Estonia'},{'name':'Etiopía', 'id':'Etiopía'},{'name':'Islas Feroe', 'id':'Islas Feroe'},{'name':'Filipinas', 'id':'Filipinas'},{'name':'Finlandia', 'id':'Finlandia'},{'name':'Fiyi', 'id':'Fiyi'},{'name':'Francia', 'id':'Francia'},{'name':'Gabón', 'id':'Gabón'},{'name':'Gambia', 'id':'Gambia'},{'name':'Georgia', 'id':'Georgia'},{'name':'Islas Georgias del Sur y Sandwich del Sur', 'id':'Islas Georgias del Sur y Sandwich del Sur'},{'name':'Ghana', 'id':'Ghana'},{'name':'Gibraltar', 'id':'Gibraltar'},{'name':'Granada', 'id':'Granada'},{'name':'Grecia', 'id':'Grecia'},{'name':'Groenlandia', 'id':'Groenlandia'},{'name':'Guadalupe', 'id':'Guadalupe'},{'name':'Guam', 'id':'Guam'},{'name':'Guatemala', 'id':'Guatemala'},{'name':'Guayana Francesa', 'id':'Guayana Francesa'},{'name':'Guinea', 'id':'Guinea'},{'name':'Guinea Ecuatorial', 'id':'Guinea Ecuatorial'},{'name':'Guinea-Bissau', 'id':'Guinea-Bissau'},{'name':'Guyana', 'id':'Guyana'},{'name':'Haití', 'id':'Haití'},{'name':'Islas Heard y McDonald', 'id':'Islas Heard y McDonald'},{'name':'Honduras', 'id':'Honduras'},{'name':'Hong Kong', 'id':'Hong Kong'},{'name':'Hungría', 'id':'Hungría'},{'name':'India', 'id':'India'},{'name':'Indonesia', 'id':'Indonesia'},{'name':'Irán', 'id':'Irán'},{'name':'Iraq', 'id':'Iraq'},{'name':'Irlanda', 'id':'Irlanda'},{'name':'Islandia', 'id':'Islandia'},{'name':'Israel', 'id':'Israel'},{'name':'Italia', 'id':'Italia'},{'name':'Jamaica', 'id':'Jamaica'},{'name':'Japón', 'id':'Japón'},{'name':'Jordania', 'id':'Jordania'},{'name':'Kazajstán', 'id':'Kazajstán'},{'name':'Kenia', 'id':'Kenia'},{'name':'Kirguistán', 'id':'Kirguistán'},{'name':'Kiribati', 'id':'Kiribati'},{'name':'Kuwait', 'id':'Kuwait'},{'name':'Laos', 'id':'Laos'},{'name':'Lesotho', 'id':'Lesotho'},{'name':'Letonia', 'id':'Letonia'},{'name':'Líbano', 'id':'Líbano'},{'name':'Liberia', 'id':'Liberia'},{'name':'Libia', 'id':'Libia'},{'name':'Liechtenstein', 'id':'Liechtenstein'},{'name':'Lituania', 'id':'Lituania'},{'name':'Luxemburgo', 'id':'Luxemburgo'},{'name':'Macao', 'id':'Macao'},{'name':'ARY Macedonia', 'id':'ARY Macedonia'},{'name':'Madagascar', 'id':'Madagascar'},{'name':'Malasia', 'id':'Malasia'},{'name':'Malawi', 'id':'Malawi'},{'name':'Maldivas', 'id':'Maldivas'},{'name':'Malí', 'id':'Malí'},{'name':'Malta', 'id':'Malta'},{'name':'Islas Malvinas', 'id':'Islas Malvinas'},{'name':'Islas Marianas del Norte', 'id':'Islas Marianas del Norte'},{'name':'Marruecos', 'id':'Marruecos'},{'name':'Islas Marshall', 'id':'Islas Marshall'},{'name':'Martinica', 'id':'Martinica'},{'name':'Mauricio', 'id':'Mauricio'},{'name':'Mauritania', 'id':'Mauritania'},{'name':'Mayotte', 'id':'Mayotte'},{'name':'México', 'id':'México'},{'name':'Micronesia', 'id':'Micronesia'},{'name':'Moldavia', 'id':'Moldavia'},{'name':'Mónaco', 'id':'Mónaco'},{'name':'Mongolia', 'id':'Mongolia'},{'name':'Montserrat', 'id':'Montserrat'},{'name':'Mozambique', 'id':'Mozambique'},{'name':'Myanmar', 'id':'Myanmar'},{'name':'Namibia', 'id':'Namibia'},{'name':'Nauru', 'id':'Nauru'},{'name':'Nepal', 'id':'Nepal'},{'name':'Nicaragua', 'id':'Nicaragua'},{'name':'Níger', 'id':'Níger'},{'name':'Nigeria', 'id':'Nigeria'},{'name':'Niue', 'id':'Niue'},{'name':'Isla Norfolk', 'id':'Isla Norfolk'},{'name':'Noruega', 'id':'Noruega'},{'name':'Nueva Caledonia', 'id':'Nueva Caledonia'},{'name':'Nueva Zelanda', 'id':'Nueva Zelanda'},{'name':'Omán', 'id':'Omán'},{'name':'Países Bajos', 'id':'Países Bajos'},{'name':'Pakistán', 'id':'Pakistán'},{'name':'Palau', 'id':'Palau'},{'name':'Palestina', 'id':'Palestina'},{'name':'Panamá', 'id':'Panamá'},{'name':'Papúa Nueva Guinea', 'id':'Papúa Nueva Guinea'},{'name':'Paraguay', 'id':'Paraguay'},{'name':'Perú', 'id':'Perú'},{'name':'Islas Pitcairn', 'id':'Islas Pitcairn'},{'name':'Polinesia Francesa', 'id':'Polinesia Francesa'},{'name':'Polonia', 'id':'Polonia'},{'name':'Portugal', 'id':'Portugal'},{'name':'Puerto Rico', 'id':'Puerto Rico'},{'name':'Qatar', 'id':'Qatar'},{'name':'Reino Unido', 'id':'Reino Unido'},{'name':'Reunión', 'id':'Reunión'},{'name':'Ruanda', 'id':'Ruanda'},{'name':'Rumania', 'id':'Rumania'},{'name':'Rusia', 'id':'Rusia'},{'name':'Sahara Occidental', 'id':'Sahara Occidental'},{'name':'Islas Salomón', 'id':'Islas Salomón'},{'name':'Samoa', 'id':'Samoa'},{'name':'Samoa Americana', 'id':'Samoa Americana'},{'name':'San Cristóbal y Nevis', 'id':'San Cristóbal y Nevis'},{'name':'San Marino', 'id':'San Marino'},{'name':'San Pedro y Miquelón', 'id':'San Pedro y Miquelón'},{'name':'San Vicente y las Granadinas', 'id':'San Vicente y las Granadinas'},{'name':'Santa Helena', 'id':'Santa Helena'},{'name':'Santa Lucía', 'id':'Santa Lucía'},{'name':'Santo Tomé y Príncipe', 'id':'Santo Tomé y Príncipe'},{'name':'Senegal', 'id':'Senegal'},{'name':'Serbia y Montenegro', 'id':'Serbia y Montenegro'},{'name':'Seychelles', 'id':'Seychelles'},{'name':'Sierra Leona', 'id':'Sierra Leona'},{'name':'Singapur', 'id':'Singapur'},{'name':'Siria', 'id':'Siria'},{'name':'Somalia', 'id':'Somalia'},{'name':'Sri Lanka', 'id':'Sri Lanka'},{'name':'Suazilandia', 'id':'Suazilandia'},{'name':'Sudáfrica', 'id':'Sudáfrica'},{'name':'Sudán', 'id':'Sudán'},{'name':'Suecia', 'id':'Suecia'},{'name':'Suiza', 'id':'Suiza'},{'name':'Surinam', 'id':'Surinam'},{'name':'Svalbard y Jan Mayen', 'id':'Svalbard y Jan Mayen'},{'name':'Tailandia', 'id':'Tailandia'},{'name':'Taiwán', 'id':'Taiwán'},{'name':'Tanzania', 'id':'Tanzania'},{'name':'Tayikistán', 'id':'Tayikistán'},{'name':'Territorio Británico del Océano Índico', 'id':'Territorio Británico del Océano Índico'},{'name':'Territorios Australes Franceses', 'id':'Territorios Australes Franceses'},{'name':'Timor Oriental', 'id':'Timor Oriental'},{'name':'Togo', 'id':'Togo'},{'name':'Tokelau', 'id':'Tokelau'},{'name':'Tonga', 'id':'Tonga'},{'name':'Trinidad y Tobago', 'id':'Trinidad y Tobago'},{'name':'Túnez', 'id':'Túnez'},{'name':'Islas Turcas y Caicos', 'id':'Islas Turcas y Caicos'},{'name':'Turkmenistán', 'id':'Turkmenistán'},{'name':'Turquía', 'id':'Turquía'},{'name':'Tuvalu', 'id':'Tuvalu'},{'name':'Ucrania', 'id':'Ucrania'},{'name':'Uganda', 'id':'Uganda'},{'name':'Uruguay', 'id':'Uruguay'},{'name':'Uzbekistán', 'id':'Uzbekistán'},{'name':'Vanuatu', 'id':'Vanuatu'},{'name':'Venezuela', 'id':'Venezuela'},{'name':'Vietnam', 'id':'Vietnam'},{'name':'Islas Vírgenes Británicas', 'id':'Islas Vírgenes Británicas'},{'name':'Islas Vírgenes de los Estados Unidos', 'id':'Islas Vírgenes de los Estados Unidos'},{'name':'Wallis y Futuna', 'id':'Wallis y Futuna'},{'name':'Yemen', 'id':'Yemen'},{'name':'Yibuti', 'id':'Yibuti'},{'name':'Zambia', 'id':'Zambia'},{'name':'Zimbabue', 'id':'Zimbabue'}]