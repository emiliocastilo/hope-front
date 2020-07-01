import { Component, OnInit } from '@angular/core';
import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsService } from 'src/app/core/services/forms/forms.service';

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

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private formService: FormsService
  ) {}

  ngOnInit(): void {
    this.modalForm = this.fb.group({
      code: [''],
      description: [''],
    });
  }

  openModal(content: any) {
    event.preventDefault();
    this.modalService.open(content);
  }

  onSearch(event: any) {
    let url;
    if (event.target.value.length > 3) {
      this.config.params.forEach((element: any, index: number) => {
        url = this.config.endpoint.replace(
          '${' + index + '}',
          event.target.value
        );
      });
      this.makeRequest(url);
    }
  }

  async makeRequest(url: string) {
    const res: any = await this.formService.callEndpoint(url);
    if (res) {
      this.response = res.content;
    }
  }

  selectResult(element: any) {
    this.group.controls[this.config.name].setValue(
      element.code + ' ' + element.description
    );
    this.modalService.dismissAll();
    this.response = null;
    this.modalForm.reset();
  }
}
