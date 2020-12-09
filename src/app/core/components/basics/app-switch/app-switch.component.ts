import { Component, OnInit, HostBinding, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
    selector: 'app-switch',
    templateUrl: './app-switch.component.html',
    styleUrls: ['./app-switch.component.scss'],
})
export class SwitchComponent implements ControlValueAccessor {
    @HostBinding('attr.id') externalId = '';

    @Input() label: string;

    @Input()
    set id(value: string) {
        this._ID = value;
        this.externalId = null;
    }

    get id() {
        return this._ID;
    }

    private _ID = '';

    @Input('value') _value = false;
    onChange: any = () => {};
    onTouched: any = () => {};

    get value() {
        return this._value;
    }

    set value(val) {
        this._value = val;
        this.onChange(val);
        this.onTouched();
    }

    constructor(@Self() private controlDirective: NgControl) {
        controlDirective.valueAccessor = this;
    }

    registerOnChange(fn) {
        this.onChange = fn;
    }

    writeValue(value) {
        if (value) {
            this.value = value;
        }
    }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }

    switch() {
        this.value = !this.value;
    }
}
