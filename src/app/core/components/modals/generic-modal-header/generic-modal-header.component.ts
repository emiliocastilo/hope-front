import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-generic-modal-header',
  templateUrl: './generic-modal-header.component.html',
  styleUrls: ['./generic-modal-header.component.sass'],
})
export class GenericModalHeaderComponent implements OnInit {
  @Input() title: string;
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public onClick() {
    this.close.emit(null);
  }
}
