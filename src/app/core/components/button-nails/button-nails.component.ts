import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-button-nails',
  templateUrl: './button-nails.component.html',
  styleUrls: ['./button-nails.component.scss'],
})
export class ButtonNailsComponent implements OnInit, OnChanges {
  @Input() Valuehand: string;
  @Input() group: string;
  menu: SideBarItemModel[] = [];
  @Input() form: FormGroup;
  @Input() filledForm: any;
  @Input() clearHand: boolean;
  @Output() eventClear: EventEmitter<any> = new EventEmitter<any>();
  menique: Array<boolean>;
  pulgar: Array<boolean>;
  indice: Array<boolean>;
  anular: Array<boolean>;
  corazon: Array<boolean>;
  pulgarScore: number;
  indiceScore: number;
  anularScore: number;
  corazonScore: number;
  meniqueScore: number;
  pulgarNapsi: number;
  indiceNapsi: number;
  anularNapsi: number;
  corazonNapsi: number;
  meniqueNapsi: number;

  @Output() napsi: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _formBuilder: FormBuilder) {
    this.clear();
  }

  ngOnChanges() {
    if (this.clearHand) {
      setTimeout(() => {
        this.clear();
        this.eventClear.emit(false);
      }, 100);
    }
  }
  ngOnInit(): void {
    setTimeout(() => {
      if (this.filledForm) {
        this.paintNails(this.filledForm, this.group);
      }
    }, 500);
  }

  paintNails(form, group) {
    const keys = Object.keys(form[group]).filter((k) => {
      return form[group][k];
    });
    keys.forEach((e) => {
      this[e] = form[group][e];
      this.form.value[this.group][e] = form[group][e];
      this.calculateNail(form[group][e], e);
    });
  }

  clickNail(nail, index) {
    this[nail][index] = !this[nail][index];
    this.form.value[this.group][nail][index] = this[nail][index];
    this.calculateNail(this[nail], nail);

    if (this[nail][index]) {
      this.napsi.emit(1);
    } else {
      this.napsi.emit(-1);
    }
  }

  calculateNail(nail: Array<boolean>, key) {
    let score = 0;
    let napsiNail = 0;
    nail.forEach((n) => {
      if (n) {
        score = score + 25;
        napsiNail = napsiNail + 1;
      }
    });
    switch (key) {
      case 'pulgar':
        this.pulgarScore = score;
        this.pulgarNapsi = napsiNail;
        break;
      case 'indice':
        this.indiceScore = score;
        this.indiceNapsi = napsiNail;
        break;
      case 'anular':
        this.anularScore = score;
        this.anularNapsi = napsiNail;
        break;
      case 'corazon':
        this.corazonScore = score;
        this.corazonNapsi = napsiNail;
        break;
      case 'menique':
        this.meniqueScore = score;
        this.meniqueNapsi = napsiNail;
        break;
    }
  }
  clear() {
    this.meniqueScore = 0;
    this.corazonScore = 0;
    this.anularScore = 0;
    this.indiceScore = 0;
    this.pulgarScore = 0;
    this.pulgar = [false, false, false, false];
    this.menique = [false, false, false, false];
    this.indice = [false, false, false, false];
    this.anular = [false, false, false, false];
    this.corazon = [false, false, false, false];
  }
}
