import { Component, OnInit } from '@angular/core';
import { DataRowComponent } from '../data-row/data-row.component';

@Component({
  selector: 'app-data-store-table',
  templateUrl: './data-store-table.component.html',
  styleUrls: ['./data-store-table.component.css'],
})
export class DataStoreTableComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  items = [
    {
      id: 1,
      firstName: 'Mark',
      lastName: 'Otto',
      username: 'mdo',
      component: DataRowComponent,
    },
    {
      id: 2,
      firstName: 'Jacob',
      lastName: 'Thornton',
      username: 'fat',
      component: DataRowComponent,
    },
    {
      id: 3,
      firstName: 'Larry',
      lastName: 'Bird',
      username: 'LarryB',
      component: DataRowComponent,
    },
  ];
  tableOptions = {
    parentRef: this,
  };
  clickFn(data: any) {
    console.log('from data-sore table ', data);
  }
}
