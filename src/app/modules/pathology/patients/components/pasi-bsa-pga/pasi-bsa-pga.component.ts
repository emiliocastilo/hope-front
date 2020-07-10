import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-pasi-bsa-pga',
  templateUrl: './pasi-bsa-pga.component.html',
  styleUrls: ['./pasi-bsa-pga.component.scss'],
})
export class PasiBsaPgaComponent implements OnInit {
  head: boolean;
  sup: boolean;
  inf: boolean;
  body: boolean;
  pasiForm: FormGroup;
  pga: Array<string>;
  pasiScore: string;
  bsaScore: string;
  bsaCalification: string;
  today: string;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.today = moment(new Date()).format('YYYY-MM-DD');
    this.pga = ['0', '1', '2'];
    this.pasiForm = this.fb.group({
      cabeza: this.fb.group({
        area: '',
        eritema: '',
        infiltracion: '',
        escamas: '',
        total: '',
      }),
      tronco: this.fb.group({
        area: '',
        eritema: '',
        infiltracion: '',
        escamas: '',
        total: '',
      }),
      esup: this.fb.group({
        area: '',
        eritema: '',
        infiltracion: '',
        escamas: '',
        total: '',
      }),
      einf: this.fb.group({
        area: '',
        eritema: '',
        infiltracion: '',
        escamas: '',
        total: '',
      }),
      evaluationDate: '',
    });
  }

  isChecked(event: any, field: string) {
    this[field] = event;
  }

  onSave() {
    console.log(this.pasiForm);
  }

  onClose() {
    console.log('cancel');
  }

  onSelectPGA(event: any) {
    console.log(event);
  }
}
