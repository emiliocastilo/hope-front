import { Component } from '@angular/core';
import { constants } from '../../../../../../constants/constants';

@Component({
  selector: 'app-work-groups',
  templateUrl: './work-groups.component.html',
  styleUrls: ['./work-groups.component.scss'],
})
export class WorkGroupsComponent {
  key = constants.keyWorkGroups;
}
