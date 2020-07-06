import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pasi-bsa-pga',
  templateUrl: './pasi-bsa-pga.component.html',
  styleUrls: ['./pasi-bsa-pga.component.scss'],
})
export class PasiBsaPgaComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onSave() {
    console.log('save');
  }

  onClose() {
    console.log('cancel');
  }
}
