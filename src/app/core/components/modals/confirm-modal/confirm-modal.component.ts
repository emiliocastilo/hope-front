import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent implements OnInit {
    @Input() title: string;
    @Input() messageModal: string;
    @Input() cancelText: string;
    @Input() acceptText: string;
    @Input() dismissText: string;
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() dismiss: EventEmitter<any> = new EventEmitter();
    @Output() accept: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit (): void { }

    public onCancel () {
        this.cancel.emit(null);
    }

    public onDismiss () { 
        this.dismiss.emit(null);
    }

    public onAccept () {
        this.accept.emit('on accept');
    }
}
