import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../../services/photos.service';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { PhotoModel } from '../../models/photo.model';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/core/services/notification.service';
import { EditorModalComponent } from 'src/app/core/components/modals/editor-modal/editor-modal/editor-modal.component';
import { ConfirmModalComponent } from 'src/app/core/components/modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  public menu: SideBarItemModel[] = [];
  public menuSelected: SideBarItemModel;
  public isCollapsed = false;
  public photos: any = ['', '', '', '', '', ''];
  public modalForm: FormGroup;
  public selectedPhoto: number;
  public qrcode: any;

  constructor(
    private _photos: PhotosService,
    private _translate: TranslateService,
    private _notification: NotificationService,
    private _modalService: NgbModal,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadMenu();
    this.modalForm = this._formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      photo: [null, Validators.required],
    });
  }

  loadMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')).filter((item) =>
      item.url.endsWith('/pathology/patients')
    );
    this.menuSelected = this.menu[0].children.find((item) =>
      item.url.endsWith('/pathology/patients/gallery')
    );
  }

  addPhoto() {
    let modalRef = this._modalService.open(EditorModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.id = 'createPhoto';
    modalRef.componentInstance.title = 'Subir imagen';
    modalRef.componentInstance.form = this.modalForm;
    modalRef.componentInstance.close.subscribe((event: any) => {
      modalRef.close();
    });
    modalRef.componentInstance.save.subscribe((event: any) => {
      this.savePhoto(event, modalRef);
    });
  }

  savePhoto(event: any, modal: any) {
    const reader = new FileReader();
    reader.readAsDataURL(event.value.photo);
    reader.onload = () => {
      const photo: PhotoModel = {
        pathologyId: 1,
        patientId: 21,
        title: event.value.title,
        description: event.value.description,
        userId: 1,
        name: 'foto',
        typePhoto: '',
        photoBytes: reader.result.toString(),
      };

      this._photos.addPhoto(photo).subscribe(
        (response) => {
          this._notification.showSuccessToast('element_created');
        },
        ({ error }) => {
          this._notification.showErrorToast(error.errorCode);
        }
      );
      modal.close();
    };
  }

  removePhoto() {
    const modalRef = this._modalService.open(ConfirmModalComponent);

    modalRef.componentInstance.title = 'Eliminar imagen';
    modalRef.componentInstance.messageModal =
      'Estas seguro de que quieres eliminar esta imagen?';
    modalRef.componentInstance.cancel.subscribe((event) => {
      modalRef.close();
    });
    modalRef.componentInstance.accept.subscribe((event) => {
      // this.deletePhoto();
      modalRef.close();
    });
  }

  deletePhoto() {
    this._photos.deletePhoto(this.photos[this.selectedPhoto].id).subscribe(
      (response) => {
        this._notification.showSuccessToast('element_deleted');
      },
      ({ error }) => {
        this._notification.showErrorToast(error.errorCode);
      }
    );
  }

  editPhoto(photo: any) {}

  generateQR() {
    this.isCollapsed = !this.isCollapsed;
    this._photos.generateQR(1, 1).subscribe((response: any) => {
      this.qrcode = 'data:image/png;base64,' + response;
    });
  }
}
