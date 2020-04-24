import { NgForm } from '@angular/forms/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  inputValue: String = '';
  @Output() emitAction = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  setValue(data: string) {
    if (data) {
      this.inputValue = data;
    }
  }

  filter() {
    this.emitAction.emit(this.inputValue);
  }
}
