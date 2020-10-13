import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss'],
})
export class GestionComponent implements OnInit {
  entries = [
    { name: '' },
    { name: 'users', url: 'management/gestion/users' },
    { name: 'patients', url: 'management/gestion/patients' },
    { name: 'modal.editor.field.roles', url: 'management/gestion/roles' },
  ];

  constructor() {}
  i;
  ngOnInit(): void {}
}
