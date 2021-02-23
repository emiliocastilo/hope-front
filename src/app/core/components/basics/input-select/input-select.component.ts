import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormControl, ControlValueAccessor, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-input-select',
    templateUrl: './input-select.component.html',
    styleUrls: ['./input-select.component.scss'],
})
export class InputSelectComponent implements OnInit, ControlValueAccessor, OnChanges {
    constructor(private _translate: TranslateService) {}

    @Input() id: string;
    @Input() isDisabled = false;
    @Input() labelValue = '';
    @Input() name: string;
    @Input() options: any[] = [];
    @Input() currentValue: any;
    @Input() placeholder = '';
    @Input() selectMultiple = false;
    @Input() clearAfterSelect = false;
    @Input() form: FormGroup;
    @Input() required = false;
    @Input() changes = false;
    @Input()
    set optionSelected(optionSelected: number) {
        this._optionSelected = optionSelected;
        if (this.options?.length > 0) {
            this.selectValue();
        }
    }

    @Output() selectTrigger: EventEmitter<any> = new EventEmitter<any>();

    private _optionSelected: number;

    public value: string = null;
    childControl = new FormControl();

    optionChangeSelected: boolean;

    ngOnInit(): void {
        if (this._optionSelected !== undefined) {
            const interval = setInterval(() => {
                if (this.options?.length > 0) {
                    clearInterval(interval);
                    this.selectValue();
                } else {
                    this.options = [];
                }
            }, 100);
        }
    }

    private selectValue() {
        const valueSelected = this.options.filter((f) => f.id === this._optionSelected)[0];
        this.currentValue = valueSelected;
        this.value = valueSelected?.name;

        if (!this.value && this.currentValue) this.value = this.currentValue.name;
    }

    ngOnChanges(changes) {
        if (this.changes) {
            if (changes.currentValue.currentValue && changes.currentValue.currentValue.name) {
                this.value = changes.currentValue.currentValue.name;
            }
        }
    }

    onChange(value: any): void {
        this.optionChangeSelected = this.currentValue ? true : false;
        this.selectTrigger.emit(this.currentValue);
        this.writeValue(this.currentValue.name);
        if (this.clearAfterSelect && this.value) this.writeValue('');
    }

    isSelected(option, value) {
        return option.name && value && option.name.toLowerCase() === value.toLowerCase();
    }

    writeValue(value: any): void {
        this.value = value ? value : '';
        this.childControl.setValue(value);
    }

    onTouch = () => {};

    onInput(value: any) {
        this.value = value;
        this.currentValue = this.options.find((f) => this._translate.instant(f.name?.trim()) === value?.trim());
        this.childControl.setValue(this.currentValue);
        if (this.form) this.form.controls[this.id].setValue(this.currentValue);
        this.onChange(this.value);
        this.onTouch();
    }

    registerOnChange(fn: (value: any) => void) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    setCurrentValue(name: string, objectArray: any[]) {
        objectArray.forEach((object: any) => {
            if (object.name === name) {
                console.log(object);
                this.currentValue = object;
            }
        });
    }
}
