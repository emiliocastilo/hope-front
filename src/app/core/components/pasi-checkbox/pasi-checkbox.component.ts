import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pasi-checkbox',
  templateUrl: './pasi-checkbox.component.html',
  styleUrls: ['./pasi-checkbox.component.scss'],
})
export class PasiCheckboxComponent implements OnInit {
  @Input() label: string;
  @Output() checked: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  onCheckboxChange(event: any) {
    this.checked.emit(event.target.checked);
  }
}
