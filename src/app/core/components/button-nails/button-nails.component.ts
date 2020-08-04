import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-button-nails',
  templateUrl: './button-nails.component.html',
  styleUrls: ['./button-nails.component.scss'],
})
export class ButtonNailsComponent implements OnInit {
  @Input() Valuehand: string;
  @Input() group: string;
  menu: SideBarItemModel[] = [];
  @Input() form: FormGroup;
  @Input() filledForm: any;
  @Input() score: string;
  @Input() myLabel = '';
  public ValueMen: number;
  public ValueAnul: number;
  public ValueCor: number;
  public ValuePul: number;
  public ValueInd: number;
  public isActiveButtonNailRightMen: boolean;
  public isActiveButtonNailRightUpMen: boolean;
  public isActiveButtonNailLeftUpMen: boolean;
  public isActiveButtonNailLeftMen: boolean;
  public isActiveButtonNailRightUpAnu: boolean;
  public isActiveButtonNailLeftUpAnu: boolean;
  public isActiveButtonNailLeftAnu: boolean;
  public isActiveButtonNailRightAnu: boolean;
  public isActiveButtonNailRightUpCor: boolean;
  public isActiveButtonNailLeftUpCor: boolean;
  public isActiveButtonNailLeftCor: boolean;
  public isActiveButtonNailRightCor: boolean;
  public isActiveButtonNailRightUpInd: boolean;
  public isActiveButtonNailLeftUpInd: boolean;
  public isActiveButtonNailLeftInd: boolean;
  public isActiveButtonNailRightInd: boolean;
  public isActiveButtonNailRightUpPul: boolean;
  public isActiveButtonNailLeftUpPul: boolean;
  public isActiveButtonNailLeftPul: boolean;
  public isActiveButtonNailRightPul: boolean;

  constructor(private _formBuilder: FormBuilder) {
    this.ValueAnul = 0;
    this.ValuePul = 0;
    this.ValueInd = 0;
    this.ValueCor = 0;
    this.ValueMen = 0;
    this.isActiveButtonNailRightMen = false;
    this.isActiveButtonNailRightUpMen = false;
    this.isActiveButtonNailLeftUpMen = false;
    this.isActiveButtonNailLeftMen = false;
    this.isActiveButtonNailRightUpAnu = false;
    this.isActiveButtonNailLeftUpAnu = false;
    this.isActiveButtonNailLeftAnu = false;
    this.isActiveButtonNailRightAnu = false;
    this.isActiveButtonNailRightUpCor = false;
    this.isActiveButtonNailLeftUpCor = false;
    this.isActiveButtonNailLeftCor = false;
    this.isActiveButtonNailRightCor = false;
    this.isActiveButtonNailRightUpInd = false;
    this.isActiveButtonNailLeftUpInd = false;
    this.isActiveButtonNailLeftInd = false;
    this.isActiveButtonNailRightInd = false;
    this.isActiveButtonNailRightUpPul = false;
    this.isActiveButtonNailLeftUpPul = false;
    this.isActiveButtonNailLeftPul = false;
    this.isActiveButtonNailRightPul = false;
  }

  ngOnInit(): void {}

  public paintNails(key, isFilled?) {
    if (isFilled) {
      const keys = Object.keys(key[this.group]).filter((k) => {
        return key[this.group][k];
      });
      keys.forEach((e) => {
        if (e.includes('isActive')) {
          this[e] = true;
        }
      });
    } else {
      this.activateButton(key);
    }
  }

  public activateButton(key) {
    switch (key) {
      case 'rightButtonNailMen':
        if (this.isActiveButtonNailRightMen === false && this.ValueMen < 100) {
          this.isActiveButtonNailRightMen = true;
          this.form.value[
            this.group
          ].isActiveButtonNailRightMen = this.isActiveButtonNailRightMen;
          this.ValueMen = this.ValueMen + 25;
          this.form.value[this.group].ValueMen = this.ValueMen;
        } else if (
          this.isActiveButtonNailRightMen === true &&
          this.ValueMen > 0
        ) {
          this.isActiveButtonNailRightMen = false;
          this.form.value[
            this.group
          ].isActiveButtonNailRightMen = this.isActiveButtonNailRightMen;
          this.ValueMen = this.ValueMen - 25;
          this.form.value[this.group].ValueMen = this.ValueMen;
        } else {
          this.isActiveButtonNailRightMen = false;
          this.form.value[
            this.group
          ].isActiveButtonNailRightMen = this.isActiveButtonNailRightMen;
        }
        break;
      case 'leftUpButtonNailMen':
        if (this.isActiveButtonNailLeftUpMen === false && this.ValueMen < 100) {
          this.isActiveButtonNailLeftUpMen = true;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftUpMen = this.isActiveButtonNailLeftUpMen;
          this.ValueMen = this.ValueMen + 25;
          this.form.value[this.group].ValueMen = this.ValueMen;
        } else if (
          this.isActiveButtonNailLeftUpMen === true &&
          this.ValueMen > 0
        ) {
          this.isActiveButtonNailLeftUpMen = false;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftUpMen = this.isActiveButtonNailLeftUpMen;
          this.ValueMen = this.ValueMen - 25;
          this.form.value[this.group].ValueMen = this.ValueMen;
        } else {
          this.isActiveButtonNailLeftUpMen = false;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftUpMen = this.isActiveButtonNailLeftUpMen;
        }
        break;
      case 'rightUpButtonNailMen':
        if (
          this.isActiveButtonNailRightUpMen === false &&
          this.ValueMen < 100
        ) {
          this.isActiveButtonNailRightUpMen = true;
          this.form.value[
            this.group
          ].isActiveButtonNailRightUpMen = this.isActiveButtonNailRightUpMen;
          this.ValueMen = this.ValueMen + 25;
          this.form.value[this.group].ValueMen = this.ValueMen;
        } else if (
          this.isActiveButtonNailRightUpMen === true &&
          this.ValueMen > 0
        ) {
          this.isActiveButtonNailRightUpMen = false;
          this.form.value[
            this.group
          ].isActiveButtonNailRightUpMen = this.isActiveButtonNailRightUpMen;
          this.ValueMen = this.ValueMen - 25;
          this.form.value[this.group].ValueMen = this.ValueMen;
        } else {
          this.isActiveButtonNailRightUpMen = false;
          this.form.value[
            this.group
          ].isActiveButtonNailRightUpMen = this.isActiveButtonNailRightUpMen;
        }
        break;
      case 'leftButtonNailMen':
        if (this.isActiveButtonNailLeftMen === false && this.ValueMen < 100) {
          this.isActiveButtonNailLeftMen = true;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftMen = this.isActiveButtonNailLeftMen;
          this.ValueMen = this.ValueMen + 25;
          this.form.value[this.group].ValueMen = this.ValueMen;
        } else if (
          this.isActiveButtonNailLeftMen === true &&
          this.ValueMen > 0
        ) {
          this.isActiveButtonNailLeftMen = false;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftMen = this.isActiveButtonNailLeftMen;
          this.ValueMen = this.ValueMen - 25;
          this.form.value[this.group].ValueMen = this.ValueMen;
        } else {
          this.isActiveButtonNailLeftMen = false;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftMen = this.isActiveButtonNailLeftMen;
        }
        break;
      case 'rightButtonNailAnu':
        if (this.isActiveButtonNailRightAnu === false && this.ValueAnul < 100) {
          this.isActiveButtonNailRightAnu = true;
          this.form.value[
            this.group
          ].isActiveButtonNailRightAnu = this.isActiveButtonNailRightAnu;
          this.ValueAnul = this.ValueAnul + 25;
          this.form.value[this.group].ValueAnul = this.ValueAnul;
        } else if (
          this.isActiveButtonNailRightAnu === true &&
          this.ValueAnul > 0
        ) {
          this.isActiveButtonNailRightAnu = false;
          this.form.value[
            this.group
          ].isActiveButtonNailRightAnu = this.isActiveButtonNailRightAnu;
          this.ValueAnul = this.ValueAnul - 25;
          this.form.value[this.group].ValueAnul = this.ValueAnul;
        } else {
          this.isActiveButtonNailRightAnu = false;
          this.form.value[
            this.group
          ].isActiveButtonNailRightAnu = this.isActiveButtonNailRightAnu;
        }
        break;
      case 'leftButtonNailAnu':
        if (this.isActiveButtonNailLeftAnu === false && this.ValueAnul < 100) {
          this.isActiveButtonNailLeftAnu = true;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftAnu = this.isActiveButtonNailLeftAnu;
          this.ValueAnul = this.ValueAnul + 25;
          this.form.value[this.group].ValueAnul = this.ValueAnul;
        } else if (
          this.isActiveButtonNailLeftAnu === true &&
          this.ValueAnul > 0
        ) {
          this.isActiveButtonNailLeftAnu = false;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftAnu = this.isActiveButtonNailLeftAnu;
          this.ValueAnul = this.ValueAnul - 25;
          this.form.value[this.group].ValueAnul = this.ValueAnul;
        } else {
          this.isActiveButtonNailLeftAnu = false;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftAnu = this.isActiveButtonNailLeftAnu;
        }
        break;
      case 'leftUpButtonNailAnu':
        if (
          this.isActiveButtonNailLeftUpAnu === false &&
          this.ValueAnul < 100
        ) {
          this.isActiveButtonNailLeftUpAnu = true;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftUpAnu = this.isActiveButtonNailLeftUpAnu;
          this.ValueAnul = this.ValueAnul + 25;
          this.form.value[this.group].ValueAnul = this.ValueAnul;
        } else if (
          this.isActiveButtonNailLeftUpAnu === true &&
          this.ValueAnul > 0
        ) {
          this.isActiveButtonNailLeftUpAnu = false;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftUpAnu = this.isActiveButtonNailLeftUpAnu;
          this.ValueAnul = this.ValueAnul - 25;
          this.form.value[this.group].ValueAnul = this.ValueAnul;
        } else {
          this.isActiveButtonNailLeftUpAnu = false;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftUpAnu = this.isActiveButtonNailLeftUpAnu;
        }
        break;
      case 'rightUpButtonNailAnu':
        if (
          this.isActiveButtonNailRightUpAnu === false &&
          this.ValueAnul < 100
        ) {
          this.isActiveButtonNailRightUpAnu = true;
          this.form.value[
            this.group
          ].isActiveButtonNailRightUpAnu = this.isActiveButtonNailRightUpAnu;
          this.ValueAnul = this.ValueAnul + 25;
          this.form.value[this.group].ValueAnul = this.ValueAnul;
        } else if (
          this.isActiveButtonNailRightUpAnu === true &&
          this.ValueAnul > 0
        ) {
          this.isActiveButtonNailRightUpAnu = false;
          this.form.value[
            this.group
          ].isActiveButtonNailRightUpAnu = this.isActiveButtonNailRightUpAnu;
          this.ValueAnul = this.ValueAnul - 25;
          this.form.value[this.group].ValueAnul = this.ValueAnul;
        } else {
          this.isActiveButtonNailRightUpAnu = false;
          this.form.value[
            this.group
          ].isActiveButtonNailRightUpAnu = this.isActiveButtonNailRightUpAnu;
        }
        break;
      case 'rightButtonNailAnu':
        if (this.isActiveButtonNailRightAnu === false && this.ValueAnul < 100) {
          this.isActiveButtonNailRightAnu = true;
          this.form.value[
            this.group
          ].isActiveButtonNailRightAnu = this.isActiveButtonNailRightAnu;
          this.ValueAnul = this.ValueAnul + 25;
          this.form.value[this.group].ValueAnul = this.ValueAnul;
        } else if (
          this.isActiveButtonNailRightAnu === true &&
          this.ValueAnul > 0
        ) {
          this.isActiveButtonNailRightAnu = false;
          this.form.value[
            this.group
          ].isActiveButtonNailRightAnu = this.isActiveButtonNailRightAnu;
          this.ValueAnul = this.ValueAnul - 25;
          this.form.value[this.group].ValueAnul = this.ValueAnul;
        } else {
          this.isActiveButtonNailRightAnu = false;
          this.form.value[
            this.group
          ].isActiveButtonNailRightAnu = this.isActiveButtonNailRightAnu;
        }
        break;
      case 'leftButtonNailAnu':
        if (this.isActiveButtonNailLeftAnu === false && this.ValueAnul < 100) {
          this.isActiveButtonNailLeftAnu = true;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftAnu = this.isActiveButtonNailLeftAnu;
          this.ValueAnul = this.ValueAnul + 25;
          this.form.value[this.group].ValueAnul = this.ValueAnul;
        } else if (
          this.isActiveButtonNailLeftAnu === true &&
          this.ValueAnul > 0
        ) {
          this.isActiveButtonNailLeftAnu = false;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftAnu = this.isActiveButtonNailLeftAnu;
          this.ValueAnul = this.ValueAnul - 25;
          this.form.value[this.group].ValueAnul = this.ValueAnul;
        } else {
          this.isActiveButtonNailLeftAnu = false;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftAnu = this.isActiveButtonNailLeftAnu;
        }
        break;
      case 'leftUpButtonNailAnu':
        if (
          this.isActiveButtonNailLeftUpAnu === false &&
          this.ValueAnul < 100
        ) {
          this.isActiveButtonNailLeftUpAnu = true;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftUpAnu = this.isActiveButtonNailLeftUpAnu;
          this.ValueAnul = this.ValueAnul + 25;
          this.form.value[this.group].ValueAnul = this.ValueAnul;
        } else if (
          this.isActiveButtonNailLeftUpAnu === true &&
          this.ValueAnul > 0
        ) {
          this.isActiveButtonNailLeftUpAnu = false;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftUpAnu = this.isActiveButtonNailLeftUpAnu;
          this.ValueAnul = this.ValueAnul - 25;
          this.form.value[this.group].ValueAnul = this.ValueAnul;
        } else {
          this.isActiveButtonNailLeftUpAnu = false;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftUpAnu = this.isActiveButtonNailLeftUpAnu;
        }
        break;
      case 'rightUpButtonNailAnu':
        if (
          this.isActiveButtonNailRightUpAnu === false &&
          this.ValueAnul < 100
        ) {
          this.isActiveButtonNailRightUpAnu = true;
          this.form.value[
            this.group
          ].isActiveButtonNailRightUpAnu = this.isActiveButtonNailRightUpAnu;
          this.ValueAnul = this.ValueAnul + 25;
          this.form.value[this.group].ValueAnul = this.ValueAnul;
        } else if (
          this.isActiveButtonNailRightUpAnu === true &&
          this.ValueAnul > 0
        ) {
          this.isActiveButtonNailRightUpAnu = false;
          this.form.value[
            this.group
          ].isActiveButtonNailRightUpAnu = this.isActiveButtonNailRightUpAnu;
          this.ValueAnul = this.ValueAnul - 25;
          this.form.value[this.group].ValueAnul = this.ValueAnul;
        } else {
          this.isActiveButtonNailRightUpAnu = false;
          this.form.value[
            this.group
          ].isActiveButtonNailRightUpAnu = this.isActiveButtonNailRightUpAnu;
        }
        break;
      case 'rightButtonNailCor':
        if (this.isActiveButtonNailRightCor === false && this.ValueCor < 100) {
          this.isActiveButtonNailRightCor = true;
          this.form.value[
            this.group
          ].isActiveButtonNailRightCor = this.isActiveButtonNailRightCor;
          this.ValueCor = this.ValueCor + 25;
          this.form.value[this.group].ValueCor = this.ValueCor;
        } else if (
          this.isActiveButtonNailRightCor === true &&
          this.ValueCor > 0
        ) {
          this.isActiveButtonNailRightCor = false;
          this.form.value[
            this.group
          ].isActiveButtonNailRightCor = this.isActiveButtonNailRightCor;
          this.ValueCor = this.ValueCor - 25;
          this.form.value[this.group].ValueCor = this.ValueCor;
        } else {
          this.isActiveButtonNailRightCor = false;
          this.form.value[
            this.group
          ].isActiveButtonNailRightCor = this.isActiveButtonNailRightCor;
        }
        break;
      case 'leftButtonNailCor':
        if (this.isActiveButtonNailLeftCor === false && this.ValueCor < 100) {
          this.isActiveButtonNailLeftCor = true;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftCor = this.isActiveButtonNailLeftCor;
          this.ValueCor = this.ValueCor + 25;
          this.form.value[this.group].ValueCor = this.ValueCor;
        } else if (
          this.isActiveButtonNailLeftCor === true &&
          this.ValueCor > 0
        ) {
          this.isActiveButtonNailLeftCor = false;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftCor = this.isActiveButtonNailLeftCor;
          this.ValueCor = this.ValueCor - 25;
          this.form.value[this.group].ValueCor = this.ValueCor;
        } else {
          this.isActiveButtonNailLeftCor = false;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftCor = this.isActiveButtonNailLeftCor;
        }
        break;
      case 'leftUpButtonNailCor':
        if (this.isActiveButtonNailLeftUpCor === false && this.ValueCor < 100) {
          this.isActiveButtonNailLeftUpCor = true;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftUpCor = this.isActiveButtonNailLeftUpCor;
          this.ValueCor = this.ValueCor + 25;
          this.form.value[this.group].ValueCor = this.ValueCor;
        } else if (
          this.isActiveButtonNailLeftUpCor === true &&
          this.ValueCor > 0
        ) {
          this.isActiveButtonNailLeftUpCor = false;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftUpCor = this.isActiveButtonNailLeftUpCor;
          this.ValueCor = this.ValueCor - 25;
          this.form.value[this.group].ValueCor = this.ValueCor;
        } else {
          this.isActiveButtonNailLeftUpCor = false;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftUpCor = this.isActiveButtonNailLeftUpCor;
        }
        break;
      case 'rightUpButtonNailCor':
        if (
          this.isActiveButtonNailRightUpCor === false &&
          this.ValueCor < 100
        ) {
          this.isActiveButtonNailRightUpCor = true;
          this.form.value[
            this.group
          ].isActiveButtonNailRightUpCor = this.isActiveButtonNailRightUpCor;
          this.ValueCor = this.ValueCor + 25;
          this.form.value[this.group].ValueCor = this.ValueCor;
        } else if (
          this.isActiveButtonNailRightUpCor === true &&
          this.ValueCor > 0
        ) {
          this.isActiveButtonNailRightUpCor = false;
          this.form.value[
            this.group
          ].isActiveButtonNailRightUpCor = this.isActiveButtonNailRightUpCor;
          this.ValueCor = this.ValueCor - 25;
          this.form.value[this.group].ValueCor = this.ValueCor;
        } else {
          this.isActiveButtonNailRightUpCor = false;
          this.form.value[
            this.group
          ].isActiveButtonNailRightUpCor = this.isActiveButtonNailRightUpCor;
        }
        break;
      case 'rightButtonNailInd':
        if (this.isActiveButtonNailRightInd === false && this.ValueInd < 100) {
          this.isActiveButtonNailRightInd = true;
          this.form.value[
            this.group
          ].isActiveButtonNailRightInd = this.isActiveButtonNailRightInd;
          this.ValueInd = this.ValueInd + 25;
          this.form.value[this.group].ValueInd = this.ValueInd;
        } else if (
          this.isActiveButtonNailRightInd === true &&
          this.ValueInd > 0
        ) {
          this.isActiveButtonNailRightInd = false;
          this.form.value[
            this.group
          ].isActiveButtonNailRightInd = this.isActiveButtonNailRightInd;
          this.ValueInd = this.ValueInd - 25;
          this.form.value[this.group].ValueInd = this.ValueInd;
        } else {
          this.isActiveButtonNailRightInd = false;
          this.form.value[
            this.group
          ].isActiveButtonNailRightInd = this.isActiveButtonNailRightInd;
        }
        break;
      case 'leftButtonNailInd':
        if (this.isActiveButtonNailLeftInd === false && this.ValueInd < 100) {
          this.isActiveButtonNailLeftInd = true;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftInd = this.isActiveButtonNailLeftInd;
          this.ValueInd = this.ValueInd + 25;
          this.form.value[this.group].ValueInd = this.ValueInd;
        } else if (
          this.isActiveButtonNailLeftInd === true &&
          this.ValueInd > 0
        ) {
          this.isActiveButtonNailLeftInd = false;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftInd = this.isActiveButtonNailLeftInd;
          this.ValueInd = this.ValueInd - 25;
          this.form.value[this.group].ValueInd = this.ValueInd;
        } else {
          this.isActiveButtonNailLeftInd = false;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftInd = this.isActiveButtonNailLeftInd;
        }
        break;
      case 'leftUpButtonNailInd':
        if (this.isActiveButtonNailLeftUpInd === false && this.ValueInd < 100) {
          this.isActiveButtonNailLeftUpInd = true;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftUpInd = this.isActiveButtonNailLeftUpInd;
          this.ValueInd = this.ValueInd + 25;
          this.form.value[this.group].ValueInd = this.ValueInd;
        } else if (
          this.isActiveButtonNailLeftUpInd === true &&
          this.ValueInd > 0
        ) {
          this.isActiveButtonNailLeftUpInd = false;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftUpInd = this.isActiveButtonNailLeftUpInd;
          this.ValueInd = this.ValueInd - 25;
          this.form.value[this.group].ValueInd = this.ValueInd;
        } else {
          this.isActiveButtonNailLeftUpInd = false;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftUpInd = this.isActiveButtonNailLeftUpInd;
        }
        break;
      case 'rightUpButtonNailInd':
        if (
          this.isActiveButtonNailRightUpInd === false &&
          this.ValueInd < 100
        ) {
          this.isActiveButtonNailRightUpInd = true;
          this.form.value[
            this.group
          ].isActiveButtonNailRightUpInd = this.isActiveButtonNailRightUpInd;
          this.ValueInd = this.ValueInd + 25;
          this.form.value[this.group].ValueInd = this.ValueInd;
        } else if (
          this.isActiveButtonNailRightUpInd === true &&
          this.ValueInd > 0
        ) {
          this.isActiveButtonNailRightUpInd = false;
          this.form.value[
            this.group
          ].isActiveButtonNailRightUpInd = this.isActiveButtonNailRightUpInd;
          this.ValueInd = this.ValueInd - 25;
          this.form.value[this.group].ValueInd = this.ValueInd;
        } else {
          this.isActiveButtonNailRightUpInd = false;
          this.form.value[
            this.group
          ].isActiveButtonNailRightUpInd = this.isActiveButtonNailRightUpInd;
        }
        break;
      case 'rightButtonNailPul':
        if (this.isActiveButtonNailRightPul === false && this.ValuePul < 100) {
          this.isActiveButtonNailRightPul = true;
          this.form.value[
            this.group
          ].isActiveButtonNailRightPul = this.isActiveButtonNailRightPul;
          this.ValuePul = this.ValuePul + 25;
          this.form.value[this.group].ValuePul = this.ValuePul;
        } else if (
          this.isActiveButtonNailRightPul === true &&
          this.ValuePul > 0
        ) {
          this.isActiveButtonNailRightPul = false;
          this.form.value[
            this.group
          ].isActiveButtonNailRightPul = this.isActiveButtonNailRightPul;
          this.ValuePul = this.ValuePul - 25;
          this.form.value[this.group].ValuePul = this.ValuePul;
        } else {
          this.isActiveButtonNailRightPul = false;
          this.form.value[
            this.group
          ].isActiveButtonNailRightPul = this.isActiveButtonNailRightPul;
        }
        break;
      case 'leftButtonNailPul':
        if (this.isActiveButtonNailLeftPul === false && this.ValuePul < 100) {
          this.isActiveButtonNailLeftPul = true;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftPul = this.isActiveButtonNailLeftPul;
          this.ValuePul = this.ValuePul + 25;
          this.form.value[this.group].ValuePul = this.ValuePul;
        } else if (
          this.isActiveButtonNailLeftPul === true &&
          this.ValuePul > 0
        ) {
          this.isActiveButtonNailLeftPul = false;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftPul = this.isActiveButtonNailLeftPul;
          this.ValuePul = this.ValuePul - 25;
          this.form.value[this.group].ValuePul = this.ValuePul;
        } else {
          this.isActiveButtonNailLeftPul = false;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftPul = this.isActiveButtonNailLeftPul;
        }
        break;
      case 'leftUpButtonNailPul':
        if (this.isActiveButtonNailLeftUpPul === false && this.ValuePul < 100) {
          this.isActiveButtonNailLeftUpPul = true;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftUpPul = this.isActiveButtonNailLeftUpPul;
          this.ValuePul = this.ValuePul + 25;
          this.form.value[this.group].ValuePul = this.ValuePul;
        } else if (
          this.isActiveButtonNailLeftUpPul === true &&
          this.ValuePul > 0
        ) {
          this.isActiveButtonNailLeftUpPul = false;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftUpPul = this.isActiveButtonNailLeftUpPul;
          this.ValuePul = this.ValuePul - 25;
          this.form.value[this.group].ValuePul = this.ValuePul;
        } else {
          this.isActiveButtonNailLeftUpPul = false;
          this.form.value[
            this.group
          ].isActiveButtonNailLeftUpPul = this.isActiveButtonNailLeftUpPul;
        }
        break;
      case 'rightUpButtonNailPul':
        if (
          this.isActiveButtonNailRightUpPul === false &&
          this.ValuePul < 100
        ) {
          this.isActiveButtonNailRightUpPul = true;
          this.form.value[
            this.group
          ].isActiveButtonNailRightUpPul = this.isActiveButtonNailRightUpPul;
          this.ValuePul = this.ValuePul + 25;
          this.form.value[this.group].ValuePul = this.ValuePul;
        } else if (
          this.isActiveButtonNailRightUpPul === true &&
          this.ValuePul > 0
        ) {
          this.isActiveButtonNailRightUpPul = false;
          this.form.value[
            this.group
          ].isActiveButtonNailRightUpPul = this.isActiveButtonNailRightUpPul;
          this.ValuePul = this.ValuePul - 25;
          this.form.value[this.group].ValuePul = this.ValuePul;
        } else {
          this.isActiveButtonNailRightUpPul = false;
          this.form.value[
            this.group
          ].isActiveButtonNailRightUpPul = this.isActiveButtonNailRightUpPul;
        }
        break;
      default:
    }
  }
  resetNailsComponent() {
    if (this.group === 'mano_izquierda_matriz') {
      this.isActiveButtonNailRightMen = false;
      this.isActiveButtonNailRightUpMen = false;
      this.isActiveButtonNailLeftUpMen = false;
      this.isActiveButtonNailLeftMen = false;
      this.isActiveButtonNailRightUpAnu = false;
      this.isActiveButtonNailLeftUpAnu = false;
      this.isActiveButtonNailLeftAnu = false;
      this.isActiveButtonNailRightAnu = false;
      this.isActiveButtonNailRightUpCor = false;
      this.isActiveButtonNailLeftUpCor = false;
      this.isActiveButtonNailLeftCor = false;
      this.isActiveButtonNailRightCor = false;
      this.isActiveButtonNailRightUpInd = false;
      this.isActiveButtonNailLeftUpInd = false;
      this.isActiveButtonNailLeftInd = false;
      this.isActiveButtonNailRightInd = false;
      this.isActiveButtonNailRightUpPul = false;
      this.isActiveButtonNailLeftUpPul = false;
      this.isActiveButtonNailLeftPul = false;
      this.isActiveButtonNailRightPul = false;
    }
  }
}
