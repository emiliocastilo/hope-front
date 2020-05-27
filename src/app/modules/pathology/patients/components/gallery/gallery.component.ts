import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
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
  public isCollapsed = true;
  public photos: any = [];
  public modalForm: FormGroup;
  public qrcode: any;
  public isEditing = false;
  public selectedPhoto: PhotoModel;

  constructor(
    private _photos: PhotosService,
    private _translate: TranslateService,
    private _notification: NotificationService,
    private _modalService: NgbModal,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadMenu();
    this.getPhotos();
    this.modalForm = this._formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      photo: [null],
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

  getPhotos() {
    this._photos.getPhotos(21, 1).subscribe(
      (res) => {
        this.photos = res;
      },
      ({ error }) => {
        console.log(error);
      }
    );
  }

  showModal() {
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
      this.createOrUpdatePhoto(event, modalRef);
    });
  }

  public showModalNew(): void {
    this.isEditing = false;
    this.modalForm.reset();
    this.showModal();
  }

  public showModalEdit(photo: PhotoModel): void {
    this.selectedPhoto = photo;
    Object.keys(photo).map((key: string) => {
      if (this.modalForm.controls[key]) {
        this.modalForm.controls[key].setValue(photo[key]);
      }
    });
    this.isEditing = true;
    this.showModal();
  }

  readFileAsync(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async createOrUpdatePhoto(event: any, modal: any) {
    const photobytes = this.isEditing
      ? null
      : (await this.readFileAsync(event.value.photo)).toString();
    const type = this.isEditing
      ? event.value.typePhoto
      : photobytes.split(';')[0].split('/')[1];
    const id = this.isEditing ? this.selectedPhoto.id : null;
    const photo: PhotoModel = {
      id,
      pathologyId: 1,
      patientId: 21,
      title: event.value.title,
      description: event.value.description,
      userId: 11,
      name: event.value.title,
      typePhoto: `.${type}`,
      photoBytes: photobytes,
    };

    if (this.isEditing) {
      this.editPhoto(photo);
    } else {
      this.addPhoto(photo);
    }
    modal.close();
  }

  editPhoto(editedPhoto: PhotoModel) {
    this._photos.editPhoto(editedPhoto).subscribe(
      (response) => {
        this._notification.showSuccessToast('element_updated');
        this.getPhotos();
      },
      ({ error }) => {
        this._notification.showErrorToast(error.errorCode);
      }
    );
  }

  addPhoto(newPhoto: PhotoModel) {
    this._photos.addPhoto(newPhoto).subscribe(
      (response) => {
        this._notification.showSuccessToast('element_created');
        this.getPhotos();
      },
      ({ error }) => {
        this._notification.showErrorToast(error.errorCode);
      }
    );
  }

  showModalConfirm(photoId: number) {
    const modalRef = this._modalService.open(ConfirmModalComponent);

    modalRef.componentInstance.title = 'Eliminar imagen';
    modalRef.componentInstance.messageModal =
      'Estas seguro de que quieres eliminar esta imagen?';
    modalRef.componentInstance.cancel.subscribe((event) => {
      modalRef.close();
    });
    modalRef.componentInstance.accept.subscribe((event) => {
      this.deletePhoto(photoId, modalRef);
    });
  }

  deletePhoto(id: number, modal: any) {
    this._photos.deletePhoto(id).subscribe(
      (response) => {
        this._notification.showSuccessToast('element_deleted');
        this.getPhotos();
        modal.close();
      },
      ({ error }) => {
        this._notification.showErrorToast(error.errorCode);
        modal.close();
      }
    );
  }

  downloadPhoto(photo: PhotoModel) {
    saveAs(photo.photoBytes.toString(), `${photo.title}${photo.typePhoto}`);
  }

  generateQR() {
    this.isCollapsed = !this.isCollapsed;
    this._photos.generateQR(1, 1).subscribe((response: any) => {
      this.qrcode = 'data:image/png;base64,' + response;
    });
  }
}
