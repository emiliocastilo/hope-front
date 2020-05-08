import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RowDataModel } from '../../models/table/row-data.model';
import { ColumnHeaderModel } from '../../models/table/colum-header.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() columnsHeader: Array<ColumnHeaderModel>;
  @Input() columnsData: Array<RowDataModel>;
  @Output() selectedItem: EventEmitter<number> = new EventEmitter();
  @Output() iconButtonClick: EventEmitter<any> = new EventEmitter();
  public internalSelectedItem: number;

  constructor() {}

  ngOnInit(): void {}

  activate(selectedItem: number): void {
    this.selectedItem.emit(selectedItem);
    this.internalSelectedItem = selectedItem;
  }

  emitIconButtonClick(type:string, selectedItem:number): void{
    event.preventDefault();
    this.activate(selectedItem);
    this.iconButtonClick.emit({
      selectedItem: selectedItem, 
      type: type
    });
  }
}
