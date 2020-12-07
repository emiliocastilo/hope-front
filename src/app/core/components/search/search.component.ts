import { Component, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements AfterViewInit {
    @ViewChild('input') input: ElementRef;
    @Output() emitAction = new EventEmitter();

    constructor() {}

    ngAfterViewInit() {
        fromEvent(this.input.nativeElement, 'keyup')
            .pipe(debounceTime(1000), distinctUntilChanged())
            .subscribe(() => this.emitAction.emit(this.input.nativeElement.value));
    }

    clearSearch() {
        this.input.nativeElement.value = '';
        this.emitAction.emit('');
    }
}
