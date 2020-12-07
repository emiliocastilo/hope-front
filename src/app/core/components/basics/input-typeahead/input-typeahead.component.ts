import { Component, Input, Output, Self, OnInit, EventEmitter } from '@angular/core';
import { FormControl, ControlValueAccessor, NgControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-input-typeahead',
    templateUrl: './input-typeahead.component.html',
    styleUrls: ['./input-typeahead.component.scss'],
})
export class InputTypeaheadComponent implements OnInit, ControlValueAccessor {
    constructor(public _translate: TranslateService, @Self() private controlDirective: NgControl) {
        controlDirective.valueAccessor = this;
    }
    @Input() clases: string;
    @Input() id: string;
    @Input() controlForm: any;
    @Input() isDisabled = false;
    @Input() label = '';
    @Input() maxlength: any = 256;
    @Input() name: string;
    @Input() placeholder = '';
    @Input() required = false;
    @Input() type = 'text';
    @Input() invalidLabel: string;
    @Input() maxDate: string = null;
    @Input() search: any;
    @Input() inputFormatter: any;
    @Input() resultFormatter: any;
    @Input() value: any;
    @Output() selectTypeahead: EventEmitter<any> = new EventEmitter();

    childControl = new FormControl();
    onChange = (_: any) => {};
    onTouch = () => {};

    ngOnInit() {}

    onInput(value: any) {
        if (value === '') {
            this.value = value;
            this.onTouch();
            this.onChange(this.value);
        }
    }

    writeValue(value: any): void {
        if (value) {
            this.value = value;
        } else {
            this.value = '';
        }
        this.childControl.setValue(value);
    }

    getValue(value) {
        if (value.name) {
            return value.name;
        }
        return '';
    }

    selectedItem(event) {
        this.value = event.item;
        this.controlForm.setValue(event.item);
        this.selectTypeahead.emit(event.item);
        // this.onInput(event.item.name);
    }

    registerOnChange(fn: (value: any) => void) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    validate({ value }: FormControl) {
        const isNotValid = this.value === '' || this.value === undefined || this.value === null;
        return (
            isNotValid && {
                invalid: true,
            }
        );
    }

    get invalid(): boolean {
        return !this.controlDirective.valid && this.controlDirective.dirty;
    }
}
