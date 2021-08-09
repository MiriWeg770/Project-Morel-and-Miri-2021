import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-menu-details',
  templateUrl: './show-menu-details.component.html',
  styleUrls: ['./show-menu-details.component.css']
})
export class ShowMenuDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public opened = false;

  public close() {
    this.opened = false;
  }

  public open() {
    this.opened = true;
  }
}
