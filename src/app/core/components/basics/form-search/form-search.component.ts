import { Component, OnInit } from '@angular/core';
import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsService } from 'src/app/core/services/forms/forms.service';
import { PatientModel } from 'src/app/modules/pathology/patients/models/patient.model';

@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.scss'],
})
export class FormSearchComponent implements OnInit {
  config: FieldConfig;
  group: FormGroup;
  modalForm: FormGroup;
  response: any;
  patient: PatientModel;
  headersDetailsTable: string[];
  actions: Array<any>;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private formService: FormsService
  ) {}

  ngOnInit(): void {
    this.modalForm = this.fb.group({
      search: [''],
    });
    this.headersDetailsTable = ['code', 'description'];
    this.actions = [{ name: 'select', icon: 'chevrons-right' }];
    this.patient = JSON.parse(localStorage.getItem('selectedUser'));
  }

  openModal(content: any) {
    event.preventDefault();
    this.modalService.open(content, { size: 'lg', backdrop: false });
  }

  closeModal() {
    this.modalService.dismissAll();
    this.response = null;
    this.modalForm.reset();
  }

  onSearch(event: any) {
    let url = this.config.endpoint;
    if (event.target.value.length > 3) {
      this.config.params.forEach((element: any, index: number) => {
        url = url.replace(
          '${' + index + '}',
          element === 'hospital' ? this.patient.hospital.id : event.target.value
        );
      });
      this.makeRequest(url);
    }
  }

  async makeRequest(url: string) {
    const res: any = await this.formService.callEndpoint(url);
    if (res) {
      this.response = res;
    }
  }

  selectResult(e: any) {
    const element = this.response.content[e.selectedItem];
    this.group.controls[this.config.name].setValue(
      element.code + ' ' + element.description
    );
    this.closeModal();
  }
}
