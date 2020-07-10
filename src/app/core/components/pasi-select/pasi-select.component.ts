import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pasi-select',
  templateUrl: './pasi-select.component.html',
  styleUrls: ['./pasi-select.component.scss'],
})
export class PasiSelectComponent implements OnInit {
  @Input() group: string;
  @Input() area: FormControl;
  @Input() escamas: FormControl;
  @Input() eritema: FormControl;
  @Input() infiltracion: FormControl;
  @Input() form: FormGroup;

  selects: Array<any>;
  total = 0;
  areas = [];

  @Output() score: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {
    this.initializeComponents();
  }

  initializeComponents() {
    for (let i = 0; i <= 10; i += 0.5) {
      this.areas.push(i);
    }
    const options = [
      'notAffected',
      'mild',
      'moderate',
      'serious',
      'verySerious',
    ];
    this.selects = [
      { id: 'area', label: 'Area', options: this.areas },
      { id: 'eritema', label: 'Eritema', options },
      { id: 'infiltracion', label: 'Infiltración', options },
      { id: 'escamas', label: 'Escamas', options },
    ];
  }

  onSelect(event: any) {
    this.total++;
    this.score.emit(this.total);
  }
}
