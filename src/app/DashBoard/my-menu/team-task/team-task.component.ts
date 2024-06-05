import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-team-task',
  templateUrl: './team-task.component.html',
  styleUrls: ['./team-task.component.css'],
})
export class TeamTaskComponent implements OnInit {
  constructor(private service: DataService) {
    this.setNavTitle();
  }
  rowData = [
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  ];

  // Column Definitions: Defines the columns to be displayed.
  // colDefs: ColDef[] = [
  //   { field: "make" },
  //   { field: "model" },
  //   { field: "price",
  //   cellClass: params => params.value > 80 ? { color: 'red' } : { color: 'black' }
  //    },
  //   { field: "electric" }
  // ];
  colDefs: ColDef[] = [
    { field: 'make' },
    { field: 'model' },
    {
      field: 'price',
      cellStyle: {color:'green'}

      // cellStyle: (params) => {
      //   console.log(params, params.value);
      //   return params.value > 80
      //     ? { color: 'red' }
      //     : { color: 'blue' };
      // },
    },
    { field: 'electric' },
  ];

  ngOnInit(): void {
    console.log(this.colDefs)
  }
  setNavTitle() {
    this.service.setTabnavigateName({ name: 'Menu', modalName: 'Team Task' });
  }
}
