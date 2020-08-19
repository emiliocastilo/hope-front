import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-total-expenses-biological-treatment',
  templateUrl: './total-expenses-biological-treatment.component.html',
  styleUrls: ['./total-expenses-biological-treatment.component.scss'],
})
export class TotalExpensesBiologicalTreatmentComponent implements OnInit {
  options = ['total', 'average'];
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
    if (values.selectValue === 'Total') {
      if (values.switchValue) {
        this.router.navigate([
          'dashboard/pharmacoeconomic/total-expenses-biological-treatment/accumulated-expenses',
        ]);
      } else {
        this.router.navigate([
          'dashboard/pharmacoeconomic/total-expenses-biological-treatment/total-expenses',
        ]);
      }
    } else {
      if (values.switchValue) {
        this.router.navigate([
          'dashboard/pharmacoeconomic/total-expenses-biological-treatment/accumulated-avg-expenses',
        ]);
      } else {
        this.router.navigate([
          'dashboard/pharmacoeconomic/total-expenses-biological-treatment/avg-expenses',
        ]);
      }
    }
  }
}
