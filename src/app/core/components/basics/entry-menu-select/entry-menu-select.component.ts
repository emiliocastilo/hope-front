import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entry-menu-select',
  templateUrl: './entry-menu-select.component.html',
  styleUrls: ['./entry-menu-select.component.scss'],
})
export class EntryMenuSelectComponent implements OnInit {
  @Input() label: string;
  @Input() entries: Array<{ name: string; url: string }>;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.navigate([this.entries[0].url]);
  }

  onSelect(event): void {
    const url = event.target.value;
    this.router.navigate([url]);
  }
}
