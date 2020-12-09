import { Component, OnInit, Input } from '@angular/core';
import { FieldConfigModel} from '../../models/forms/field-config.model';

@Component({
  selector: 'app-from-title',
  templateUrl: './from-title.component.html',
  styleUrls: ['./from-title.component.scss'],
})
export class FromTitleComponent implements OnInit {
  @Input() config: FieldConfigModel;

  constructor() {}

  ngOnInit(): void {}
}
