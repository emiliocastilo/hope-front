import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'side-bar-link',
  templateUrl: './side-bar-link.component.html',
  styleUrls: ['./side-bar-link.component.sass'],
})
export class SideBarLinkComponent implements OnInit {
  @Input() id: string;
  @Input() linkText: string;
  @Output() onActionExecution: EventEmitter<string> = new EventEmitter();

  isActive: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  doAction() {
    this.isActive = true;
  }
}
