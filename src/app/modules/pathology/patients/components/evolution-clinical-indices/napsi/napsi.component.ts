import { Component, OnInit } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-napsi',
  templateUrl: './napsi.component.html',
  styleUrls: ['./napsi.component.scss'],
})
export class NapsiComponent implements OnInit {
  public Date: string;
  public DontPush: boolean;
  public Prueba: any;
  constructor() {
    this.DontPush = false;
    this.Prueba = 50;
  }

  ngOnInit(): void {
    this.dateValue();
  }
  dateValue() {
    this.Date = moment(new Date()).format('YYYY-MM-DD');
  }
}
