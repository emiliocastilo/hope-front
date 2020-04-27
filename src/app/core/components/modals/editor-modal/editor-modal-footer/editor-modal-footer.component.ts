import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-editor-modal-footer',
  templateUrl: './editor-modal-footer.component.html',
  styleUrls: ['./editor-modal-footer.component.sass'],
})
export class EditorModalFooterComponent implements OnInit {
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public onClose() {
    this.close.emit(null);
  }

  public onSave() {
    this.save.emit(null);
  }
}
