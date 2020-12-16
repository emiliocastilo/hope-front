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
                let found = false;
                let mutations = this.group.controls.mutationsAdd.value ? this.group.controls.mutationsAdd.value : [];
                if (this.group.value.mutationType) {
                    let newMutation = {
                        detectedMutation: this.group.value.detectedMutation,
                        mutationText: this.group.value.mutationText,
                        mutatedGene: this.group.value.mutatedGeneT ? this.group.value.mutatedGeneT : this.group.value.mutatedGenePr ? this.group.value.mutatedGenePr : this.group.value.mutatedGeneIn,
                        mutationType: this.group.value.mutationType,
                        otherMutationType: this.group.value.otherMutationType ? this.group.value.otherMutationType : '',
                    };
                    if (this.group.controls.mutationsAdd.value) {
                        this.group.controls.mutationsAdd.value.forEach((existingMutation, i) => {
                            if (newMutation.detectedMutation === existingMutation.detectedMutation && newMutation.mutatedGene === existingMutation.mutatedGene && newMutation.mutationType === existingMutation.mutationType) {
                                found = true;
                                if (!existingMutation.otherMutationType.includes(newMutation.otherMutationType)) {
                                    existingMutation.otherMutationType += '/' + newMutation.otherMutationType;
                                }
                            }
                        });
                        if (!found) {
                            mutations.push(newMutation);
                        }
                    } else {
                        mutations.push(newMutation);
                    }
                    if (mutations[0]) {
                        // Ordenación
                        mutations = mutations.sort((a, b) => (a.detectedMutation >= b.detectedMutation ? 1 : -1));
                        this.group.controls.mutationsAdd.setValue(mutations);
                    }
                }
                this.group.controls.mutationsAdd.setValue(mutations);
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
