import { Component, OnInit } from '@angular/core';
import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormsService } from 'src/app/core/services/forms/forms.service';
import { PatientModel } from 'src/app/modules/pathology/models/patient.model';

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
    nestedModal: NgbModalRef;

    constructor(private modalService: NgbModal, private fb: FormBuilder, private formService: FormsService) {}

    ngOnInit(): void {
        this.modalForm = this.fb.group({
            search: [''],
        });
        this.setHeadersDetailsTable();
        this.actions = [{ name: 'select', icon: 'chevrons-right' }];
        this.patient = JSON.parse(localStorage.getItem('selectedPatient'));
    }

    setHeadersDetailsTable() {
        if (this.group.controls.cieDescription) {
            this.headersDetailsTable = ['code', 'description'];
        }
        if (this.group.controls.medicine) {
            this.headersDetailsTable = ['codeAct', 'description'];
        }
    }

    openModal(content: any) {
        event.preventDefault();
        this.nestedModal = this.modalService.open(content, { size: 'lg', backdrop: 'static' });
    }

    closeModal() {
        //this.modalService.dismissAll();
        this.nestedModal.close();
        this.modalForm.reset();
    }

    onSearch(event: any) {
        let url = this.config.endpoint;
        if (event.target.value.length >= 2) {
            this.config.params.forEach((element: any, index: number) => {
                url = url.replace('${' + index + '}', element === 'hospitalId' ? this.patient.hospital.id : event.target.value);
            });
            this.makeRequest(url);
        }
    }

    async makeRequest(url: string) {
        this.formService.callEndpoint(url).subscribe((response) => (this.response = response));
    }

    selectResult(e: any) {
        const element = this.response.content[e.selectedItem];
        // Search CIE
        if (this.group.controls.cieDescription) {
            this.group.controls[this.config.name].setValue(element.code);
            this.group.controls['cieDescription'].setValue(element.description);
        }
        // Search medicines
        else if (this.group.controls.medicine) {
            this.group.controls.medicine.setValue(element.description);
        }

        this.nestedModal.close();
        this.response = null;
    }
}
