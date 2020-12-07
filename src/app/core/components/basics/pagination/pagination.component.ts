import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
    @Input() paginationData: PaginationModel;
    @Output() selectPage: EventEmitter<number> = new EventEmitter<number>();

    constructor() {}

    ngOnInit(): void {}

    pageChange(value: number) {
        value = value === 0 ? value : value - 1;
        this.selectPage.emit(value);
    }
}
