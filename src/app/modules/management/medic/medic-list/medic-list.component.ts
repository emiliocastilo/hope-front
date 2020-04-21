import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MedicService } from '../../services/medic/medic.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-medic-list',
  templateUrl: './medic-list.component.html',
  styleUrls: ['./medic-list.component.sass']
})
export class MedicListComponent implements OnInit {
  public medicListForm = new FormGroup({
    searcherForm: new FormControl()
  });
  constructor(
    public translate: TranslateService,
    public medicService: MedicService,
    private _toastr: ToastrService
  ) { }

  ngOnInit() {
    this.medicService.getAll().subscribe(result => {
    },
      error => {
        this._toastr.error(error.status + " " + error.statusText);
      });
  }

  filter(data: any) {
    console.log("datos de buscador " + data);
  }
}
