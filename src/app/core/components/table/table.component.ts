import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { RowDataModel } from '../../models/table/row-data.model';
import { ColumnHeaderModel } from '../../models/table/colum-header.model';
import { TranslateService } from '@ngx-translate/core';
import {
  NgbdSortableHeader,
  SortEvent,
} from '../../directives/sortable.directive';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() showActionButtons: boolean;
  @Input() showDetailButton: boolean;
  @Input() columnsHeader: Array<ColumnHeaderModel>;
  @Input() columnsData: Array<RowDataModel>;
  @Output() selectedItem: EventEmitter<number> = new EventEmitter();
  @Output() iconButtonClick: EventEmitter<any> = new EventEmitter();
  @Output() sort: EventEmitter<any> = new EventEmitter();
  public internalSelectedItem: number;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public _translate: TranslateService) {}

  ngOnInit(): void {}

  emitOnSort({ column, direction }: SortEvent) {
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
}
