import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-pasi-bsa-pga',
  templateUrl: './pasi-bsa-pga.component.html',
  styleUrls: ['./pasi-bsa-pga.component.scss'],
})
export class PasiBsaPgaComponent implements OnInit {
  pasiForm: FormGroup;
  pga: Array<string>;
  pasiScore: string;
  bsaScore: string;
  bsaCalification: string;
  today: string;

  constructor(private fb: FormBuilder) {}

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
    this.pga = ['0', '1', '2'];
    this.pasiForm = this.fb.group({
      cabeza: this.fb.group({
        area: new FormControl({ value: '', disabled: true }),
        eritema: new FormControl({ value: '', disabled: true }),
        infiltracion: new FormControl({ value: '', disabled: true }),
        escamas: new FormControl({ value: '', disabled: true }),
        total: '',
      }),
      tronco: this.fb.group({
        area: new FormControl({ value: '', disabled: true }),
        eritema: new FormControl({ value: '', disabled: true }),
        infiltracion: new FormControl({ value: '', disabled: true }),
        escamas: new FormControl({ value: '', disabled: true }),
        total: '',
      }),
      esup: this.fb.group({
        area: new FormControl({ value: '', disabled: true }),
        eritema: new FormControl({ value: '', disabled: true }),
        infiltracion: new FormControl({ value: '', disabled: true }),
        escamas: new FormControl({ value: '', disabled: true }),
        total: '',
      }),
      einf: this.fb.group({
        area: new FormControl({ value: '', disabled: true }),
        eritema: new FormControl({ value: '', disabled: true }),
        infiltracion: new FormControl({ value: '', disabled: true }),
        escamas: new FormControl({ value: '', disabled: true }),
        total: '',
      }),
      evaluationDate: '',
    });
  }

  isChecked(event: any, field: string) {
    if (event) {
      this.pasiForm.controls[field].enable();
    } else {
      this.pasiForm.controls[field].disable();
    }
  }

  onSave() {
    console.log(this.pasiForm);
  }

  onClose() {
    console.log('cancel');
  }

  getScore(e: any) {
    console.log('get score: ' + e);
  }

  onSelectPGA(event: any) {
    console.log(event);
  }
}
