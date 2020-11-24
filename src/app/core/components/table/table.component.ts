import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
} from '@angular/core';

import { DatePipe } from '@angular/common';
import { GenderFormatter } from 'src/app/core/pipes/gender.pipe';
import { RowDataModel } from '../../models/table/row-data.model';
import { ColumnHeaderModel } from '../../models/table/colum-header.model';
import { TranslateService } from '@ngx-translate/core';
import {
  NgbdSortableHeader,
  SortEvent,
} from '../../directives/sortable.directive';
import { TableActionsModel } from '../../models/table/table-actions-model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() showActionButtons: boolean;
  @Input() columnsHeader: Array<ColumnHeaderModel>;
  @Input() columnsData: Array<RowDataModel>;
  @Input() sortable: boolean;
  @Output() selectedItem: EventEmitter<number> = new EventEmitter();
  @Output() iconButtonClick: EventEmitter<any> = new EventEmitter();
  @Output() sort: EventEmitter<any> = new EventEmitter();
  @Input() actions: TableActionsModel[];
  @Input() fieldRedRow: string;

  public internalSelectedItem: number;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  public clickedHeader: string;

  constructor(
    public _translate: TranslateService,
    private datePipe: DatePipe,
    private genderFormatter: GenderFormatter
  ) {}

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

    const conditionDate =
      header.toLowerCase().includes('date') ||
      header.toLowerCase().includes('period') ||
      header.toLowerCase().includes('period');

    if (this.isValidDate(data) && conditionDate) {
      data = this.datePipe.transform(row, 'dd/MM/yy');
    }

    if (header.toLowerCase().includes('gender') && data) {
      data = this.genderFormatter.transform(row);
    }

    if (data && typeof data === 'object') {
      return data.name;
    }

    return data;
  }
  checkRowColor(row: any): string {
    return row.rowColor;
  }
}
