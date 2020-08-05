import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DynamicModalComponent } from '../../modals/dynamic-modal/dynamic-modal.component';

@Component({
  selector: 'app-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.scss'],
})
export class FormButtonComponent {
  @Input() clasesBtn = 'btn-primary';
  @Input() texto: string;
  @Input() type = 'button';
  config: FieldConfig;
  group: FormGroup;

  constructor(private _modalService: NgbModal) {}

  selectClick() {
    switch (this.config.button_click) {
      case 'openQuestionnaire':
        const modalRef = this._modalService.open(DynamicModalComponent, {
          size: 'xl',
        });
        modalRef.componentInstance.key = this.config.template;
        modalRef.componentInstance.close.subscribe(() => {
          modalRef.close();
        });
        modalRef.componentInstance.save.subscribe((event) => {
          this.setValues(event);
          modalRef.close();
        });
        break;
    }
  }

  setValues(values: any) {
    this.config.params.forEach((p: any) => {
      if (values[p.name]) {
        this.group.controls[p.name].setValue(values[p.name]);
      }
    });
  }
}
