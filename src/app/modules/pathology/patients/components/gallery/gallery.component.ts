import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { PhotosService } from '../../services/photos.service';
import { MenuItemModel } from 'src/app/core/models/menu-item/menu-item.model';
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
    public menu: MenuItemModel[] = [];
    public menuSelected: MenuItemModel;
    public isCollapsed = true;
    public photos: any = [];
    public modalForm: FormGroup;
    public qrcode: any;
    public isEditing = false;
    public selectedPhoto: PhotoModel;
    public selectedPatient: any;
    public pathologyId: number;

    constructor(private _photos: PhotosService, private _translate: TranslateService, private _notification: NotificationService, private _modalService: NgbModal, private _formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.selectedPatient = JSON.parse(localStorage.getItem('selectedPatient'));
        this.pathologyId = this.selectedPatient.pathologies[0].id;
        this.modalForm = this._formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            photo: [null],
        });
        this.getPhotos();
    }

    getPhotos() {
        this._photos.getPhotos(this.selectedPatient.id, this.pathologyId).subscribe(
            (res) => {
                this.photos = this.parsePhotos(res);
            },
            ({ error }) => {
                console.error(error);
            }
        );
    }

    parsePhotos(res) {
        res.forEach((element) => {
            element.photoBytes = `data:image/${element.typePhoto};base64,${element.photoBytes}`;
        });
        return res;
    }

    showModal() {
        const modalRef = this._modalService.open(EditorModalComponent, {
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
        Object.keys(photo).forEach((key: string) => {
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
        const photobytes = this.isEditing ? this.selectedPhoto.photoBytes : (await this.readFileAsync(event.value.photo)).toString();
        const type = this.isEditing ? this.selectedPhoto.typePhoto : photobytes.split(';')[0].split('/')[1];
        const id = this.isEditing ? this.selectedPhoto.id : null;
        const photo: PhotoModel = {
            id,
            pathologyId: this.pathologyId,
            patientId: this.selectedPatient.id,
            title: event.value.title,
            description: event.value.description,
            userId: 11,
            name: this.isEditing ? this.selectedPhoto.name : event.value.title,
            typePhoto: type,
            photoBytes: photobytes.split(',')[1],
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
                this._notification.showSuccessToast('elementUpdated');
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
                this._notification.showSuccessToast('elementCreated');
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
        modalRef.componentInstance.messageModal = 'Estas seguro de que quieres eliminar esta imagen?';
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
                this._notification.showSuccessToast('elementDeleted');
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
        saveAs(photo.photoBytes.toString(), `${photo.name}.${photo.typePhoto}`);
    }

    generateQR() {
        this.isCollapsed = !this.isCollapsed;
        this._photos.generateQR(this.selectedPatient.id, this.pathologyId).subscribe((response: any) => {
            this.qrcode = 'data:image/png;base64,' + response;
        });
    }
}
