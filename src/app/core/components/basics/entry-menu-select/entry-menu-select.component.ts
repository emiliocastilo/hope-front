import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entry-menu-select',
  templateUrl: './entry-menu-select.component.html',
  styleUrls: ['./entry-menu-select.component.scss'],
})
export class EntryMenuSelectComponent implements OnInit {
  @Input() selectLabel: string;
  @Input() entries: Array<{ name: string; url: string }>;
  // @Input() showYears: boolean;
  // @Input() showToggle: boolean;
  @Input() style: string;
  @Input() config: any;
  accumulated: boolean;
  selectedValue = 0;
  selectedYears = 0;
  form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.router.navigate([this.entries[this.selectedValue].url]);
    this.form = this.fb.group({
      switchValue: [false],
    });
    this.onChanges();
  }

  onChanges() {
    this.form.valueChanges.subscribe((val) => {
      this.accumulated = val.switchValue;
      this.navigate();
    });
  }

  onSelect(event: any): void {
    this.selectedValue = parseInt(event.target.value);
    this.navigate();
  }

  onInput(years) {
    if (years) {
      this.selectedYears = parseInt(years);
      this.navigate();
    }
  }

  navigate() {
    if (this.config.showToggle) {
      if (this.accumulated) {
        this.router.navigate([
          this.selectedValue === 0
            ? 'dashboard/pharmacoeconomic/consumption-biological-treatment/accumulated-monthly-consuption-euros'
            : 'dashboard/pharmacoeconomic/consumption-biological-treatment/accumulated-avg-mon-con-eu',
        ]);
      } else {
        this.router.navigate([this.entries[this.selectedValue].url]);
      }
    }
    if (this.config.showToggleExpenses) {
      if (this.accumulated) {
        this.router.navigate([
          this.selectedValue === 0
            ? 'dashboard/pharmacoeconomic/total-expenses-biological-treatment/accumulated-expenses'
            : 'dashboard/pharmacoeconomic/total-expenses-biological-treatment/accumulated-avg-expenses',
        ]);
      } else {
        this.router.navigate([this.entries[this.selectedValue].url]);
      }
    }
    if (this.config.showYears) {
      if (this.selectedYears === 0) {
        this.router.navigate([this.entries[this.selectedValue].url]);
      } else {
        this.router.navigate([
          this.selectedValue === 0
            ? 'dashboard/diagnosis/reasons/reason-change-biological-treatment-five-years'
            : 'dashboard/diagnosis/reasons/reason-stop-biological-treatment-five-years',
        ]);
      }
    }
  }
}
