import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  @Input() crumbs: any;

  public homeUrl: string = '/hopes';

  constructor() {}

  ngOnInit(): void {
    console.log('crumbs:', this.crumbs);
  }
}
