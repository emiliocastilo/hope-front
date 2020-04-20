import { Component, OnInit, Input } from '@angular/core';
import { RowDataModel } from '../../models/table/row-data.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {
  @Input() columnsHeader:Array<any>;
  @Input() columnsData:Array<RowDataModel>;

  constructor() { }

  ngOnInit(): void {
  }

}
