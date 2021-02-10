import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';

import { DatePipe } from '@angular/common';
import { GenderFormatter } from 'src/app/core/pipes/gender.pipe';
import { RowDataModel } from '../../models/table/row-data.model';
import { ColumnHeaderModel } from '../../models/table/colum-header.model';
import { TranslateService } from '@ngx-translate/core';
import { NgbdSortableHeader, SortEvent } from '../../directives/sortable.directive';
import { TableActionsModel } from '../../models/table/table-actions-model';

export interface SortModel {
    column: string;
    direction: string;
}
@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
    @Input() showActionButtons: boolean;
    @Input() columnsHeader: Array<ColumnHeaderModel>;
    @Input() columnsHidden: Array<string> = [];
    @Input() columnsData: Array<RowDataModel>;
    @Input() sortable: boolean;
    @Output() selectedItem: EventEmitter<number> = new EventEmitter();
    @Output() iconButtonClick: EventEmitter<any> = new EventEmitter();
    @Output() sort: EventEmitter<SortModel> = new EventEmitter();
    @Input() actions: TableActionsModel[];
    @Input() fieldRedRow: string;
    public internalSelectedItem: number;
    @Input() modifiedString: boolean;

    @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

    public clickedHeader: string;

    constructor(public _translate: TranslateService, private datePipe: DatePipe, private genderFormatter: GenderFormatter) {}

    ngOnInit(): void {}

    emitOnSort({ column, direction }: SortEvent) {
        this.clickedHeader = `${column}${direction}`;
        this.sort.emit({ column, direction });
    }

    activate(selectedItem: number): void {
        this.selectedItem.emit(selectedItem);
        this.internalSelectedItem = selectedItem;
    }

    emitIconButtonClick(type: string, selectedItem: number): void {
        event.preventDefault();
        this.activate(selectedItem);
        this.iconButtonClick.emit({
            selectedItem: selectedItem,
            type: type,
        });
    }

    checkHiddenColumn(element: any): boolean {
        return this.columnsHidden.filter((f) => f === element).length > 0;
    }

    isValidDate(date: string): boolean {
        let pass = false;
        const dateObject = new Date(date);
        if (Object.prototype.toString.call(dateObject) === '[object Date]') {
            if (!isNaN(dateObject.getTime())) {
                pass = true;
            }
        }

        return pass;
    }

    showDataTable(row: any, header: string) {
        let data = row;

        // console.log(data, typeof (data), typeof (data) === 'object');
        if (data && typeof data === 'object' && data.name) {
            data = data.name;
        }

        const conditionDate = header.toLowerCase().includes('date') || header.toLowerCase().includes('period') || header.toLowerCase().includes('period');

        if (conditionDate && this.isValidDate(data)) {
            data = this.datePipe.transform(row, 'dd/MM/yy');
        }

        if (header.toLowerCase().includes('gender') && data) {
            data = this.genderFormatter.transform(row);
        }

        if (data && typeof data === 'object') {
            return data.name;
        }
        // Parseo para las tablas que usan constantes de back
        if (data && this.modifiedString) {
            switch (data) {
                case 'BIOLOGICO':
                    return 'Biológico';
                case 'QUIMICO':
                    return 'Químico';
                case 'TOPICO':
                    return 'Tópico';
            }
        }

        if (data && header == 'uvb') {
            data = 'Si';
        } else if ((data == null || !data) && header == 'uvb') {
            data = 'No';
        } else if (data && header == 'psoralenoPlusUva') {
            data = 'Si';
        } else if ((data == null || !data) && header == 'psoralenoPlusUva') {
            data = 'No';
        }

        if (data === true || data === false) data = data === true ? 'Sí' : 'No';

        return data;
    }

    checkRowColor(row: any): string {
        return row.rowColor;
    }
}
