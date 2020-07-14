import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import moment from 'moment';
import PasiUtils from './PasiUtils';
import { FormsService } from 'src/app/core/services/forms/forms.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { PatientModel } from '../../models/patient.model';
import { constants } from '../../../../../../constants/constants';

@Component({
  selector: 'app-pasi-bsa-pga',
  templateUrl: './pasi-bsa-pga.component.html',
  styleUrls: ['./pasi-bsa-pga.component.scss'],
})
export class PasiBsaPgaComponent implements OnInit {
  pasiForm: FormGroup;
  pga: Array<any>;
  pasiScore: string;
  bsaScore: string;
  bsaCalification: string;
  pasiCalification: string;
  pgaCalification: string;
  today: string;
  cabeza: boolean;
  tronco: boolean;
  esup: boolean;
  einf: boolean;
  patient: PatientModel;
  filledForm: any;
  defaultChecked: boolean;
  key = constants.keyPasiBsaPga;

  constructor(
    private fb: FormBuilder,
    private _formsService: FormsService,
    private _notification: NotificationService
  ) {}

  get area(): FormControl {
    return this.pasiForm.controls['area'] as FormControl;
  }
  get infiltracion(): FormControl {
    return this.pasiForm.controls['infiltracion'] as FormControl;
  }
  get escamas(): FormControl {
    return this.pasiForm.controls['escamas'] as FormControl;
  }
  get eritema(): FormControl {
    return this.pasiForm.controls['eritema'] as FormControl;
  }

  ngOnInit(): void {
    this.today = moment(new Date()).format('YYYY-MM-DD');
    this.pasiForm = this.fb.group({
      cabeza: this.fb.group({
        area: new FormControl({ value: '', disabled: true }),
        eritema: new FormControl({ value: '', disabled: true }),
        infiltracion: new FormControl({ value: '', disabled: true }),
        escamas: new FormControl({ value: '', disabled: true }),
        total: new FormControl({ value: '', disabled: true }),
      }),
      tronco: this.fb.group({
        area: new FormControl({ value: '', disabled: true }),
        eritema: new FormControl({ value: '', disabled: true }),
        infiltracion: new FormControl({ value: '', disabled: true }),
        escamas: new FormControl({ value: '', disabled: true }),
        total: new FormControl({ value: '', disabled: true }),
      }),
      esup: this.fb.group({
        area: new FormControl({ value: '', disabled: true }),
        eritema: new FormControl({ value: '', disabled: true }),
        infiltracion: new FormControl({ value: '', disabled: true }),
        escamas: new FormControl({ value: '', disabled: true }),
        total: new FormControl({ value: '', disabled: true }),
      }),
      einf: this.fb.group({
        area: new FormControl({ value: '', disabled: true }),
        eritema: new FormControl({ value: '', disabled: true }),
        infiltracion: new FormControl({ value: '', disabled: true }),
        escamas: new FormControl({ value: '', disabled: true }),
        total: new FormControl({ value: '', disabled: true }),
      }),
      evaluationDate: '',
      pga: '',
      bsa: '',
    });
    this.pga = PasiUtils.getPGAOptions();
    this.getPatientId();
    this.getAndParseForm();
  }

  getPatientId() {
    this.patient = JSON.parse(localStorage.getItem('selectedUser'));
  }

  async getAndParseForm() {
    const retrievedForm: any = await this._formsService.retrieveForm(
      this.key,
      this.patient.id
    );
    if (retrievedForm && retrievedForm.data && retrievedForm.data.length > 0) {
      this.filledForm = retrievedForm.data[0].value;
      // PasiUtils.parseFormFilled(this.filledForm[0].value);
      // this.pasiForm.setValue(this.filledForm);
      //this.isChecked(true, 'cabeza');
    }
  }

  isChecked(event: any, field: string) {
    if (event) {
      this.pasiForm.controls[field].enable();
    } else {
      this.pasiForm.controls[field].disable();
    }
    this[field] = event;
  }

  onSave() {
    const form = {
      template: this.key,
      data: PasiUtils.parseEntriesForm(this.pasiForm.value),
      patientId: this.patient.id,
    };
    this.fillForm(form);
  }

  onClose() {
    //TODO CLEAR FORM?
    console.log('cancel');
  }

  getScore(scores: any) {
    this.pasiScore = scores.pasi;
    this.bsaScore = scores.bsa;
    this.pasiForm.value.bsa = this.bsaScore;
    this.pasiCalification = PasiUtils.getCalificationPasi(this.pasiScore);
    this.bsaCalification = PasiUtils.getCalificationBsa(this.bsaScore);
  }

  onSelectPGA(event: any) {
    const option = event.target.value.split(':')[1].trim();
    this.pgaCalification = PasiUtils.selectPGA(option);
  }

  fillForm(form: any) {
    this._formsService.fillForm(form).subscribe(
      () => {
        this._notification.showSuccessToast('elementCreated');
      },
      ({ error }) => {
        this._notification.showErrorToast(error.errorCode);
      }
    );
  }
}
