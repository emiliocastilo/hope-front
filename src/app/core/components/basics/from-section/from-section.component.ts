import { Component, OnInit, Input } from '@angular/core';
import { FieldConfigModel } from 'src/app/core/models/forms/field-config.model';


@Component({
  selector: 'app-from-section',
  templateUrl: './from-section.component.html',
  styleUrls: ['./from-section.component.scss'],
})
export class FromSectionComponent implements OnInit {
  @Input() config: FieldConfigModel;

  constructor() {}

  ngOnInit(): void {}
}
