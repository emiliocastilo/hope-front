import { Component, Input, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormsService } from '../../../../../../core/services/forms/forms.service';
import { constants } from '../../../../../../../constants/constants';
import { PatientModel } from '../../../models/patient.model';
import FormUtils from '../../../../../../core/utils/FormUtils';
import { TranslateService } from '@ngx-translate/core';
import { ManyChartModalComponent } from '../../../../../../core/components/modals/many-chart-modal/many-chart-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import PasiUtils from '../../pasi-bsa-pga/PasiUtils';
import { NotificationService } from '../../../../../../core/services/notification.service';
import { HealthOutcomeModel } from '../../../models/health-outcome.model';
import { ButtonNailsComponent } from '../../../../../../core/components/button-nails/button-nails.component';
import { NapsiService } from '../../../services/napsi.service';

@Component({
  selector: 'app-napsi',
  templateUrl: './napsi.component.html',
  styleUrls: ['./napsi.component.scss'],
})
export class NapsiComponent implements OnInit {
  key = 'napsi';
  napsiScore: string;
  public evaluationDate: string;
  filledForm: any;
  napsiCalification: string;
  public DontPush: boolean;
  public form: FormGroup;
  patient: PatientModel;
  public retrievedFormFormat = {};
  public formKeys: Array<string> = [];
  public retrievedForm;
  @ViewChild(ButtonNailsComponent) resetNails: ButtonNailsComponent;
  constructor(
    private _notification: NotificationService,
    private _formBuilder: FormBuilder,
    private _formsService: FormsService,
    public _translate: TranslateService,
    private _napsiService: NapsiService,
    private _modalService: NgbModal
  ) {
    this.DontPush = false;
  }

  ngOnInit(): void {
    this.patient = JSON.parse(localStorage.getItem('selectedUser'));
    this.getForm();
    this.getFormNails();
  }

  async getFormNails() {
    this.form = this._formBuilder.group({
      evaluationDate: [moment(new Date()).format('YYYY-MM-DD')],
      mano_izquierda_matriz: this._formBuilder.group({
        ValueAnul: new FormControl(0),
        ValuePul: new FormControl(0),
        ValueInd: new FormControl(0),
        ValueCor: new FormControl(0),
        ValueMen: new FormControl(0),
        isActiveButtonNailRightMen: new FormControl(false),
        isActiveButtonNailRightUpMen: new FormControl(false),
        isActiveButtonNailLeftUpMen: new FormControl(false),
        isActiveButtonNailLeftMen: new FormControl(false),
        isActiveButtonNailRightUpAnu: new FormControl(false),
        isActiveButtonNailLeftUpAnu: new FormControl(false),
        isActiveButtonNailLeftAnu: new FormControl(false),
        isActiveButtonNailRightAnu: new FormControl(false),
        isActiveButtonNailRightUpCor: new FormControl(false),
        isActiveButtonNailLeftUpCor: new FormControl(false),
        isActiveButtonNailLeftCor: new FormControl(false),
        isActiveButtonNailRightCor: new FormControl(false),
        isActiveButtonNailRightUpInd: new FormControl(false),
        isActiveButtonNailLeftUpInd: new FormControl(false),
        isActiveButtonNailLeftInd: new FormControl(false),
        isActiveButtonNailRightInd: new FormControl(false),
        isActiveButtonNailRightUpPul: new FormControl(false),
        isActiveButtonNailLeftUpPul: new FormControl(false),
        isActiveButtonNailLeftPul: new FormControl(false),
        isActiveButtonNailRightPul: new FormControl(false),
      }),
      mano_derecha_matriz: this._formBuilder.group({
        ValueAnul: new FormControl(0),
        ValuePul: new FormControl(0),
        ValueInd: new FormControl(0),
        ValueCor: new FormControl(0),
        ValueMen: new FormControl(0),
        isActiveButtonNailRightMen: new FormControl(false),
        isActiveButtonNailRightUpMen: new FormControl(false),
        isActiveButtonNailLeftUpMen: new FormControl(false),
        isActiveButtonNailLeftMen: new FormControl(false),
        isActiveButtonNailRightUpAnu: new FormControl(false),
        isActiveButtonNailLeftUpAnu: new FormControl(false),
        isActiveButtonNailLeftAnu: new FormControl(false),
        isActiveButtonNailRightAnu: new FormControl(false),
        isActiveButtonNailRightUpCor: new FormControl(false),
        isActiveButtonNailLeftUpCor: new FormControl(false),
        isActiveButtonNailLeftCor: new FormControl(false),
        isActiveButtonNailRightCor: new FormControl(false),
        isActiveButtonNailRightUpInd: new FormControl(false),
        isActiveButtonNailLeftUpInd: new FormControl(false),
        isActiveButtonNailLeftInd: new FormControl(false),
        isActiveButtonNailRightInd: new FormControl(false),
        isActiveButtonNailRightUpPul: new FormControl(false),
        isActiveButtonNailLeftUpPul: new FormControl(false),
        isActiveButtonNailLeftPul: new FormControl(false),
        isActiveButtonNailRightPul: new FormControl(false),
      }),
      mano_izquierda_lecho: this._formBuilder.group({
        ValueAnul: new FormControl(0),
        ValuePul: new FormControl(0),
        ValueInd: new FormControl(0),
        ValueCor: new FormControl(0),
        ValueMen: new FormControl(0),
        isActiveButtonNailRightMen: new FormControl(false),
        isActiveButtonNailRightUpMen: new FormControl(false),
        isActiveButtonNailLeftUpMen: new FormControl(false),
        isActiveButtonNailLeftMen: new FormControl(false),
        isActiveButtonNailRightUpAnu: new FormControl(false),
        isActiveButtonNailLeftUpAnu: new FormControl(false),
        isActiveButtonNailLeftAnu: new FormControl(false),
        isActiveButtonNailRightAnu: new FormControl(false),
        isActiveButtonNailRightUpCor: new FormControl(false),
        isActiveButtonNailLeftUpCor: new FormControl(false),
        isActiveButtonNailLeftCor: new FormControl(false),
        isActiveButtonNailRightCor: new FormControl(false),
        isActiveButtonNailRightUpInd: new FormControl(false),
        isActiveButtonNailLeftUpInd: new FormControl(false),
        isActiveButtonNailLeftInd: new FormControl(false),
        isActiveButtonNailRightInd: new FormControl(false),
        isActiveButtonNailRightUpPul: new FormControl(false),
        isActiveButtonNailLeftUpPul: new FormControl(false),
        isActiveButtonNailLeftPul: new FormControl(false),
        isActiveButtonNailRightPul: new FormControl(false),
      }),
      mano_derecha_lecho: this._formBuilder.group({
        ValueAnul: new FormControl(0),
        ValuePul: new FormControl(0),
        ValueInd: new FormControl(0),
        ValueCor: new FormControl(0),
        ValueMen: new FormControl(0),
        isActiveButtonNailRightMen: new FormControl(false),
        isActiveButtonNailRightUpMen: new FormControl(false),
        isActiveButtonNailLeftUpMen: new FormControl(false),
        isActiveButtonNailLeftMen: new FormControl(false),
        isActiveButtonNailRightUpAnu: new FormControl(false),
        isActiveButtonNailLeftUpAnu: new FormControl(false),
        isActiveButtonNailLeftAnu: new FormControl(false),
        isActiveButtonNailRightAnu: new FormControl(false),
        isActiveButtonNailRightUpCor: new FormControl(false),
        isActiveButtonNailLeftUpCor: new FormControl(false),
        isActiveButtonNailLeftCor: new FormControl(false),
        isActiveButtonNailRightCor: new FormControl(false),
        isActiveButtonNailRightUpInd: new FormControl(false),
        isActiveButtonNailLeftUpInd: new FormControl(false),
        isActiveButtonNailLeftInd: new FormControl(false),
        isActiveButtonNailRightInd: new FormControl(false),
        isActiveButtonNailRightUpPul: new FormControl(false),
        isActiveButtonNailLeftUpPul: new FormControl(false),
        isActiveButtonNailLeftPul: new FormControl(false),
        isActiveButtonNailRightPul: new FormControl(false),
      }),
      napsiScore: [''],
    });
    const retrievedForm: any = await this._formsService.retrieveForm(
      this.key,
      this.patient.id
    );
    if (retrievedForm && retrievedForm.data && retrievedForm.data.length > 0) {
      this.filledForm = JSON.parse(
        retrievedForm.data.find((e) => e.type === 'form').value
      );
      this.form.setValue(this.filledForm);
      this.resetNails.activateButton(this.filledForm);
      /*this.printFormValues(this.filledForm);*/
    }
  }
  save() {
    const form = {
      template: this.key,
      data: PasiUtils.parseNailsForm(this.form.value),
      patientId: this.patient.id,
    };

    if (this.form.valid) {
      if (this.filledForm) {
        this.updateForm(form);
      } else {
        this.fillForm(form);
      }
      /*this._napsiService.saveScore({
        patient: this.patient.id,
         date: new Date(this.form.value.evaluationDate).toISOString(),
         indexType: 'napsi',
         value: this.napsiScore,
         result: this.napsiCalification,
       });*/
    }
  }
  /* getScore(scores: any) {
    this.napsiScore = scores.napsi;
    this.form.setValue(this.napsiScore);
    this.napsiCalification = PasiUtils.getCalificationNapsi(this.napsiScore);
  }*/

  onClear() {
    this.form.reset();
  }

  updateForm(form: any) {
    this._formsService.updateForm(form).subscribe(
      () => {
        this._notification.showSuccessToast('elementUpdated');
      },
      ({ error }) => {
        this._notification.showErrorToast(error.errorCode);
      }
    );
  }

  fillForm(form: any) {
    this._formsService.fillForm(form).subscribe(
      () => {
        this._notification.showSuccessToast('elementCreated');
      },
      ({ error }) => {
        this._notification.showErrorToast(error.errorCode);
      }
    );
  }

  private showModalGraph(data: any[]) {
    const modalRef = this._modalService.open(ManyChartModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.title = this._translate.instant('eavPase');
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.close.subscribe(() => {
      modalRef.close();
    });
  }

  async showChartFront() {
    const dataGraph: any = await this._formsService.retrieveFormGraph(
      this.key,
      this.patient.id
    );

    if (dataGraph.length > 0) {
      dataGraph.forEach((element) => {
        if (element.values.length > 0) {
          element.values.forEach((value) => {
            value.date = new Date(value.date);
          });
        }
      });
    }

    this.showModalGraph(dataGraph);
  }

  async getForm() {
    this.retrievedForm = await this._formsService.retrieveForm(
      this.key,
      this.patient.id
    );

    if (this.retrievedForm && this.retrievedForm.data.length > 0) {
      for (const element of this.retrievedForm.data) {
        this.retrievedFormFormat[element.name] = element.value;
      }
    }
  }
}
