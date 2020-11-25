import { Component } from '@angular/core';
import { constants } from '../../../../../../constants/constants';

@Component({
  selector: 'app-metabolic-profile',
  templateUrl: './metabolic-profile.component.html',
  styleUrls: ['./metabolic-profile.component.scss'],
})
export class MetabolicProfileComponent {
  key = constants.keyMetabolicProfile;
}
