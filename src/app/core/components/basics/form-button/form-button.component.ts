import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DynamicModalComponent } from '../../modals/dynamic-modal/dynamic-modal.component';
import FormUtils from 'src/app/core/utils/FormUtils';

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
            case 'mutationsAdd':
                let params = [this.group.value.detectedMutation, this.group.value.mutationText, this.group.value.mutatedGene, this.group.value.mutationType, this.group.value.otherMutationType];

                if (this.group.controls.mutationsAdd.value) {
                    params.push('  -  ');
                    params.push(this.group.controls.mutationsAdd.value);
                }
                if (params[0]) {
                    this.group.controls.mutationsAdd.setValue(params);
                }

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
