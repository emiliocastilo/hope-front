import { Component, OnInit, Input } from '@angular/core';
import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';

@Component({
  selector: 'app-from-title',
  templateUrl: './from-title.component.html',
  styleUrls: ['./from-title.component.scss'],
})
export class FromTitleComponent implements OnInit {
  @Input() config: FieldConfig;

  constructor() {}

  ngOnInit(): void {}
}
