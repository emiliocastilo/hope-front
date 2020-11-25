import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PaginationModel } from '../../models/pagination/pagination/pagination.model';
import TableActionsBuilder from '../../utils/TableActionsBuilder';

@Component({
  selector: 'app-results-per-page',
  templateUrl: './results-per-page.component.html',
  styleUrls: ['./results-per-page.component.scss'],
})
export class ResultsPerPageComponent implements OnInit {
  @Input() paginationData: PaginationModel;

  @Output() itemsPerPage: EventEmitter<number> = new EventEmitter<number>();

  public optionsItemsPerPage: number[] = [5, 10, 20, 30, 40, 50, 100, 150];
  public selectedOption: number = 5;

  constructor() {}

  ngOnInit(): void {}

  handleChange(event) {
    this.itemsPerPage.emit(this.selectedOption);
  }
}
