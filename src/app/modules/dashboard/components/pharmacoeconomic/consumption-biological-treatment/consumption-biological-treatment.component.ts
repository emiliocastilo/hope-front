import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-consumption-biological-treatment',
  templateUrl: './consumption-biological-treatment.component.html',
  styleUrls: ['./consumption-biological-treatment.component.scss'],
})
export class ConsumptionBiologicalTreatmentComponent implements OnInit {
  options = ['annual', 'average'];
  form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      selectValue: [],
      switchValue: [false],
    });

    this.onChanges();
  }

  onChanges(): void {
    this.form.valueChanges.subscribe((val) => {
      this.showScreen(val);
    });
  }

  showScreen(values: any) {
    if (values.selectValue === 'annual') {
      if (values.switchValue) {
        this.router.navigate([
          'dashboard/pharmacoeconomic/consumption-biological-treatment/accumulated-monthly-consuption-euros',
        ]);
      } else {
        this.router.navigate([
          'dashboard/pharmacoeconomic/consumption-biological-treatment/monthly-consuption-euros',
        ]);
      }
    } else {
      if (values.switchValue) {
        this.router.navigate([
          'dashboard/pharmacoeconomic/consumption-biological-treatment/accumulated-avg-mon-con-eu',
        ]);
      } else {
        this.router.navigate([
          'dashboard/pharmacoeconomic/consumption-biological-treatment/avg-mon-con-eu',
        ]);
      }
    }
  }
}
