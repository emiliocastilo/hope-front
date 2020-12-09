import { Component, OnInit, Input } from '@angular/core';
import { FieldConfigModel } from 'src/app/core/models/forms/field-config.model';

@Component({
  selector: 'app-from-divider',
  templateUrl: './from-divider.component.html',
  styleUrls: ['./from-divider.component.scss'],
})
export class FromDividerComponent implements OnInit {
  @Input() config: FieldConfigModel[] = [];

  constructor() {}

  ngOnInit(): void {}
}
