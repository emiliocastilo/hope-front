import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pasi-select',
  templateUrl: './pasi-select.component.html',
  styleUrls: ['./pasi-select.component.scss'],
})
export class PasiSelectComponent implements OnInit {
  // @Input() form: FormGroup;
  // @Input() groupName: string;
  @Input() disabled = true;
  public selects: Array<any>;
  public total = 0;
  public areas = [];
  constructor() {}

  ngOnInit(): void {
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
      { id: 'infiltracion', label: 'Infiltracion', options },
      { id: 'escamas', label: 'Escamas', options },
    ];
  }

  onSelect(event: any) {
    this.total++;
  }
}
