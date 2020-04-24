import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
})
export class ModalComponent implements OnInit {
  @Input() title: string;
  @Input() modalData: {
    primaryButton: { showButton: boolean; buttonText: string };
    secondaryButton: { showButton: boolean; buttonText: string };
    modalContent: string;
  };
  @Output() emitInfo = new EventEmitter<{ opStatus: string }>();
  myForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    console.log(this.modalData);
  }

  closeModal() {
    this.activeModal.close(this.modalData);
  }

  public emitData() {
    this.emitInfo.emit({ opStatus: 'confirmed' });
    this.activeModal.dismiss();
  }

  createForm() {
    this.myForm = this.formBuilder.group({
      username: '',
      password: '',
    });
  }
  submitForm() {
    this.activeModal.close(this.myForm.value);
  }
}
