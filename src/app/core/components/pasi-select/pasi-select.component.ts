import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-pasi-select',
    templateUrl: './pasi-select.component.html',
    styleUrls: ['./pasi-select.component.scss'],
})
export class PasiSelectComponent implements OnInit {
    @Input() group: string;
    @Input() area: FormControl;
    @Input() escamas: FormControl;
    @Input() eritema: FormControl;
    @Input() infiltracion: FormControl;
    @Input() total: FormControl;
    @Input() form: FormGroup;

    selects: Array<any>;
    totalPasi: any;
    totalcabeza: any;
    totaltronco: any;
    totalesup: any;
    totaleinf: any;
    bsaScore: any;
    areas = [];

    @Output() score: EventEmitter<any> = new EventEmitter<any>();

    constructor() {}

    ngOnInit(): void {
        this.initializeComponents();
    }

    initializeComponents() {
        for (let i = 0; i <= 10; i += 0.5) {
            this.areas.push({ label: i, value: i * 10 });
        }
        const options = [
            { label: 'notAffected', value: 0 },
            { label: 'mild', value: 1 },
            { label: 'moderate', value: 2 },
            { label: 'serious', value: 3 },
            { label: 'verySerious', value: 4 },
        ];
        this.selects = [
            { id: 'area', label: 'Area', options: this.areas },
            { id: 'eritema', label: 'Eritema', options },
            { id: 'infiltracion', label: 'Infiltración', options },
            { id: 'escamas', label: 'Escamas', options },
        ];
    }

    onSelect(event: any) {
        this.calculatePasi();
        this.totalPasi = this.calculateTotalPasi();
        this.score.emit({ pasi: this.totalPasi, bsa: this.bsaScore });
    }

    calculatePasi() {
        switch (this.group) {
            case 'cabeza':
                const cabeza = 0.1 * this.calculateTotalZone(this.group);
                this.totalcabeza = Math.round(cabeza * 100) / 100;
                this.form.value[this.group].total = this.totalcabeza;
                break;
            case 'tronco':
                const tronco = 0.3 * this.calculateTotalZone(this.group);
                this.totaltronco = Math.round(tronco * 100) / 100;
                this.form.value[this.group].total = this.totaltronco;
                break;
            case 'esup':
                const esup = 0.2 * this.calculateTotalZone(this.group);
                this.totalesup = Math.round(esup * 100) / 100;
                this.form.value[this.group].total = this.totalesup;
                break;
            case 'einf':
                const einf = 0.4 * this.calculateTotalZone(this.group);
                this.totaleinf = Math.round(einf * 100) / 100;
                this.form.value[this.group].total = this.totaleinf;
                break;
            default:
                break;
        }

        this.bsaScore =
            this.parseValue(this.form.value.cabeza, 'area', 'int') * 0.1 +
            this.parseValue(this.form.value.tronco, 'area', 'int') * 0.3 +
            this.parseValue(this.form.value.esup, 'area', 'int') * 0.2 +
            this.parseValue(this.form.value.einf, 'area', 'int') * 0.4;
    }

    calculateTotalZone(field: string) {
        return this.calculateST(this.form.value[field].area) * (this.parseValue(this.form.value[field], 'eritema', 'int') + this.parseValue(this.form.value[field], 'infiltracion', 'int') + this.parseValue(this.form.value[field], 'escamas', 'int'));
    }

    calculateTotalPasi() {
        return this.parseValue(this.form.value.cabeza, 'total', 'float') + this.parseValue(this.form.value.tronco, 'total', 'float') + this.parseValue(this.form.value.esup, 'total', 'float') + this.parseValue(this.form.value.einf, 'total', 'float');
    }

    calculateST(superficie: number) {
        if (superficie === 0) {
            return 0;
        } else if (superficie < 10) {
            return 1;
        } else if (superficie < 30) {
            return 2;
        } else if (superficie < 50) {
            return 3;
        } else if (superficie < 70) {
            return 4;
        } else if (superficie < 90) {
            return 5;
        } else if (superficie < 101) {
            return 6;
        }
    }

    parseValue(value: any, child: string, type: string) {
        switch (type) {
            case 'int':
                return parseInt(value && value[child] ? value[child] : 0, 10);
            case 'float':
                return parseFloat(value && value[child] ? value[child] : 0);
        }
    }
}
