import { Component, OnInit, Input } from '@angular/core';
import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';

@Component({
  selector: 'app-from-divider',
  templateUrl: './from-divider.component.html',
  styleUrls: ['./from-divider.component.scss'],
})
export class FromDividerComponent implements OnInit {
  @Input() config: FieldConfig[] = [];

  constructor() {}

  ngOnInit(): void {}
}
