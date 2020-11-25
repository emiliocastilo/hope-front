import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-editor-modal-footer',
  templateUrl: './editor-modal-footer.component.html',
  styleUrls: ['./editor-modal-footer.component.scss'],
})
export class EditorModalFooterComponent implements OnInit {
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Input() disableSave: boolean;

  constructor() {}

  ngOnInit(): void {}

  public onClose() {
    this.close.emit(null);
  }

  public onSave(value: any) {
    if (!this.disableSave) {
      this.save.emit(null);
    }
  }
}
