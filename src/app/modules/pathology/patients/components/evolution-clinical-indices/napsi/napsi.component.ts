import { Component, Input, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-napsi',
  templateUrl: './napsi.component.html',
  styleUrls: ['./napsi.component.scss'],
})
export class NapsiComponent implements OnInit {
  key = constants.eavPase;
  public Date: string;
  public DontPush: boolean;
  public form: FormGroup;
  patient: PatientModel;
  public retrievedFormFormat = {};
  public formKeys: Array<string> = [];
  public retrievedForm;
  constructor(
    private _formBuilder: FormBuilder,
    private _formsService: FormsService,
    public _translate: TranslateService,
    private _modalService: NgbModal
  ) {
    this.DontPush = false;
  }

  ngOnInit(): void {
    this.patient = JSON.parse(localStorage.getItem('selectedUser'));
    this.getForm();
    this.form = this._formBuilder.group({
      Date: [moment(new Date()).format('YYYY-MM-DD')],
      mano_izquierda_matriz: this._formBuilder.group({
        ValueAnul: new FormControl(0),
        ValuePul: new FormControl(0),
        ValueInd: new FormControl(0),
        ValueCor: new FormControl(0),
        ValueMen: new FormControl(0),
      }),
      mano_derecha_matriz: this._formBuilder.group({
        ValueAnul: new FormControl(0),
        ValuePul: new FormControl(0),
        ValueInd: new FormControl(0),
        ValueCor: new FormControl(0),
        ValueMen: new FormControl(0),
      }),
      mano_izquierda_lecho: this._formBuilder.group({
        ValueAnul: new FormControl(0),
        ValuePul: new FormControl(0),
        ValueInd: new FormControl(0),
        ValueCor: new FormControl(0),
        ValueMen: new FormControl(0),
      }),
      mano_derecha_lecho: this._formBuilder.group({
        ValueAnul: new FormControl(0),
        ValuePul: new FormControl(0),
        ValueInd: new FormControl(0),
        ValueCor: new FormControl(0),
        ValueMen: new FormControl(0),
      }),
      pga: ['', Validators.required],
      bsa: ['', Validators.required],
      pasi: ['', Validators.required],
    });
  }
  save() {
    console.log(this.form);
    const form = {
      template: this.key,
      data: PasiUtils.parseEntriesForm(this.pasiForm.value),
      patientId: this.patient.id,
    };

    if (this.form.valid) {
      if (this.filledForm) {
        this.updateForm(form);
      } else {
        this.fillForm(form);
      }
      for (let i = 0; i < 3; i++) {
        this.saveHealthOutcome(i);
      }
    }
  }

  onClear() {
    this.form.reset();
  }
  onSelectPGA(event: any) {
    const option = event.target.value.split(':')[1].trim();
    this.pgaCalification = PasiUtils.selectPGA(option);
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

  showChartFront() {
    event.preventDefault();

    const parseData = FormUtils.formatDataMultiGraph(
      this._translate,
      this.formKeys,
      'eavpase',
      this.retrievedFormFormat
    );

    this.showModalGraph(parseData);
  }
  public invalidForm() {
    return this.form.invalid;
  }

  public resetForm() {
    this.form.reset({
      date: moment(new Date()).format('YYYY-MM-DD'),
      evaluationPrurito: '',
      evaluationGlobalPatient: '',
      evaluationGlobalMedic: '',
      dateEvaluation2: moment(new Date()).format('YYYY-MM-DD'),
      paseScoreTotal: '',
      valuationSymptoms: '',
      valuationFunctional: '',
    });
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
