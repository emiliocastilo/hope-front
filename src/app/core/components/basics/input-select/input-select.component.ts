import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormControl, ControlValueAccessor, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-input-select',
    templateUrl: './input-select.component.html',
    styleUrls: ['./input-select.component.scss'],
})
export class InputSelectComponent implements OnInit, ControlValueAccessor, OnChanges {
    constructor() { }

    @Input() id: string;
    @Input() isDisabled = false;
    @Input() labelValue = '';
    @Input() name: string;
    @Input() options: any[] = [];
    @Input() optionSelected: number;
    @Input() currentValue: any;
    @Input() placeholder = '';
    @Input() selectMultiple = false;
    @Input() clearAfterSelect = false;
    @Input() form: FormGroup;
    @Input() required = false;
    @Input() changes = false;

    @Output() selectTrigger: EventEmitter<any> = new EventEmitter<any>();

    public value: string = null;
    childControl = new FormControl();

    optionChangeSelected: boolean;

    ngOnInit (): void {
        if (this.optionSelected !== undefined) {
            const interval = setInterval(() => {
                if (this.options.length > 0) {
                    clearInterval(interval);
                    const valueSelected = this.options.filter(f => f.id === this.optionSelected)[0];
                    if (valueSelected) {
                        this.currentValue = valueSelected;
                        this.value = valueSelected.name;
                    }

                    if (!this.value && this.currentValue) {
                        this.value = this.currentValue.name;
                    }
                }
            }, 100);
        }
    }

    ngOnChanges (changes) {
        if (this.changes) {
            if (changes.currentValue.currentValue && changes.currentValue.currentValue.name) {
                this.value = changes.currentValue.currentValue.name;
            }
            // else if (!changes.currentValue.currentValue) {
            //   this.value = '';
            // }
        }
    }

    onChange (value: any): void {
        if (this.currentValue) {
            this.optionChangeSelected = true;
        } else {
            this.optionChangeSelected = false;
        }
        this.selectTrigger.emit(this.currentValue);
        if (this.clearAfterSelect && this.value) {
            this.writeValue('');
        }
    }

    isSelected (option, value) {
        return option.name && value && option.name.toLowerCase() === value.toLowerCase();
    }

    writeValue (value: any): void {
        if (value) {
            this.value = value;
        } else {
            this.value = '';
        }
        this.childControl.setValue(value);
    }

    onTouch = () => { };

    onInput (value: any) {
        this.value = value;
        this.setCurrentValue(value, this.options);
        this.childControl.setValue(this.currentValue);
        if (this.form) this.form.controls[this.id].setValue(this.currentValue);
        this.onChange(this.value);
        this.onTouch();
    }

    registerOnChange (fn: (value: any) => void) {
        this.onChange = fn;
    }

    registerOnTouched (fn: any): void {
        this.onTouch = fn;
    }

    setCurrentValue (name: string, objectArray: any[]) {
        objectArray.forEach((object: any) => {
            if (object.name === name) {
                this.currentValue = object;
            }
        });
    }
}
