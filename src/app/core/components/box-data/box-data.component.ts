import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormsService } from 'src/app/core/services/forms/forms.service';
import { PatientModel } from 'src/app/modules/pathology/patients/models/patient.model';
import { ConfirmModalComponent } from 'src/app/core/components/modals/confirm-modal/confirm-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-box-data',
  templateUrl: './box-data.component.html',
  styleUrls: ['./box-data.component.scss'],
})
export class BoxDataComponent implements OnInit {
  @Input() data: any = {};
  @Input() keysToShow: string[] = [];
  public gender: string;

  constructor(
    public _translate: TranslateService,
    private _formService: FormsService,
    private _modalService: NgbModal
  ) {}

  public currentData: PatientModel;
  private keysNotShow: any = {
    fullName: true,
  };

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    this.currentData = changes.data
      ? changes.data.currentValue
      : JSON.parse(localStorage.getItem('selectedUser') || '{}');
  }

  public parsedata(object: PatientModel, key: string): string {
    const valuetoPrint = object[key] ? object[key] : '';
    return valuetoPrint;
  }

  public showKey(key: string): string {
    return this.keysNotShow[key] ? '' : key;
  }

  public parserDataToShowInTooltip() {
    let text = '';

    if (this.currentData.hospital) {
      text = `${this.currentData.hospital.name}`;
    }
    if (this.currentData.address) {
      text += ` | ${this.currentData.address}`;
    }
    if (this.currentData.email) {
      text += ` | ${this.currentData.email}`;
    }

    return text;
  }

  public back() {
    if (this.checkConditionToNavigate()) {
      window.history.back();
    } else {
      this.showModalConfirm();
    }
  }

  checkConditionToNavigate(): boolean {
    if (this._formService.getMustBeSaved()) {
      if (this._formService.getSavedForm()) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
  private showModalConfirm() {
    const modalRef = this._modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = 'Aviso de cambios';
    modalRef.componentInstance.messageModal =
      'Hay cambios sin guardar, ¿Continuar?';
    modalRef.componentInstance.cancel.subscribe((event) => {
      modalRef.close();
      this._formService.setSavedForm(false);
    });
    modalRef.componentInstance.accept.subscribe((event) => {
      modalRef.close();
      this._formService.setSavedForm(true);
      this.back();
    });
  }
}
