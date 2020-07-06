import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

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
  options = ['1', '2', '3'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
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
    });
  }

  onCheckboxChange(event: any, name: string) {
    this[name] = event.target.checked;
  }

  onSelect(event: any) {
    console.log(this.pasiForm.value);
  }

  onSave() {
    console.log('save');
  }

  onClose() {
    console.log('cancel');
  }
}
