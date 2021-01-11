import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-vih-treatment-modal',
    templateUrl: './vih-treatment-modal.component.html',
    styleUrls: ['./vih-treatment-modal.component.scss']
})
export class VIHTreatmentModalComponent implements OnInit {
    @Input() type: string;
    @Input() title: string;
    @Input() form: FormGroup;
    @Input() options: any[];
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<any> = new EventEmitter();
    @Output() update: EventEmitter<any> = new EventEmitter();
    @Output() selectInputTypeahead: EventEmitter<any> = new EventEmitter();
    @Output() selectDose: EventEmitter<any> = new EventEmitter();
    @Output() selectTreatmentType: EventEmitter<any> = new EventEmitter();
    @Output() selectTopicalType: EventEmitter<any> = new EventEmitter();

    public formKeys: string[] = [];
    public showRequiredLegend: boolean = false;
    public selectOptions = {
        doses: [],
        regimes: []
    };
    
    constructor() { }

    get validForm (): boolean {
        return this.form.valid;
    }

    ngOnInit (): void {
        this.formKeys = Object.keys(this.form.controls);
        // this.showRequiredLegend = this.checkIfThereRequiredField();
    }

    public onSave () {
        if (this.validForm) {
            this.save.emit(this.form);
        }
    }

    public onUpdate () {
        if (this.validForm) {
            this.update.emit(this.form);
        }
    }

    public onClose () {
        this.cancel.emit(null);
    }

    public isDisabled (formKey) {
        if (this.type === 'changeSuspend') {
            return ['medicine', 'family', 'atc', 'cn', 'tract', 'indication'].indexOf(formKey) > -1;
        } else {
            return ['family', 'atc', 'cn', 'tract', 'indication'].indexOf(formKey) > -1;
        }
    }

}
