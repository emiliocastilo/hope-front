import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RowDataModel } from '../../models/table/row-data.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {
  @Input() columnsHeader:Array<any>;
  @Input() columnsData:Array<RowDataModel>;
  @Output() selectedItem:EventEmitter<number> = new EventEmitter();
  public internalSelectedItem:number;

  constructor() { }

  ngOnInit(): void {
  }

  activate(selectedItem:number): void{
    this.selectedItem.emit(selectedItem);
    this.internalSelectedItem = selectedItem;
  }

}
