import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entry-menu-select',
  templateUrl: './entry-menu-select.component.html',
  styleUrls: ['./entry-menu-select.component.scss'],
})
export class EntryMenuSelectComponent implements OnInit {
  @Input() selectLabel: string;
  @Input() entries: Array<{ name: string; url: string }>;
  @Input() showYears: boolean;
  selectedValue: number;
  selectedYears: number;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.navigate([this.entries[0].url]);
  }

  onSelect(event: any): void {
    this.selectedValue = event.target.value;
    this.navigate();
  }

  onInput(years) {
    this.selectedYears = years;
    this.navigate();
  }

  navigate() {
    if (this.selectedYears === 0) {
      this.router.navigate([this.entries[this.selectedValue].url]);
    } else {
      this.router.navigate([
        !this.selectedValue || this.selectedValue === 0
          ? 'dashboard/diagnosis/reasons/reason-change-biological-treatment-five-years'
          : 'dashboard/diagnosis/reasons/reason-stop-biological-treatment-five-years',
      ]);
    }
  }
}
