import { Component, OnInit } from '@angular/core';
import { log } from 'console';

@Component({
  selector: 'app-data-row',
  templateUrl: './data-row.component.html',
  styleUrls: ['./data-row.component.css'],
})
export class DataRowComponent implements OnInit {
  constructor() {}
  data: any;
  api: any;

  ngOnInit(): void {}

  cellInit(data: any, _component: any, api: any) {
    console.log(data);
    this.data = data.username;
    this.api = api;
    console.log(api);
  }
  OnClick() {
    console.log(this.data);
    this.api.parentRef.clickFn(this.data);
  }
}
