import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  view: string = 'month';

  viewDate: Date = new Date();

  events: any[] = [];

  clickedDate!: Date;
}
