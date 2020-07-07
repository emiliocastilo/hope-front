import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-phototherapy-modal',
  templateUrl: './phototherapy-modal.component.html',
  styleUrls: ['./phototherapy-modal.component.scss'],
})
export class PhototherapyModalComponent implements OnInit {
  @Input() title: string;
  @Input() form: FormGroup;
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() update: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public onSave() {
    this.save.emit(this.form);
  }

  public onUpdate() {
    this.update.emit(this.form);
  }

  public onClose() {
    this.cancel.emit(this.form);
  }
}
