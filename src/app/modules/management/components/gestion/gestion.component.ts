import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss'],
})
export class GestionComponent implements OnInit {
  entries = [
    { name: 'medics', url: 'management/gestion/medics' },
    { name: 'patients', url: 'management/gestion/patients' },
    { name: 'modal.editor.field.roles', url: 'management/gestion/roles' },
  ];

  constructor() {}

  ngOnInit(): void {}
}