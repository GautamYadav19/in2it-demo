import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ColDef, GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-team-task',
  templateUrl: './team-task.component.html',
  styleUrls: ['./team-task.component.css'],
})
export class TeamTaskComponent implements OnInit {
  getRowStyle: any;
  gridOptions!: GridOptions;
  constructor(private service: DataService) {
    this.setNavTitle();
  }
  rowData = [
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  ];

  colDefs: ColDef[] = [
    {
      field: 'make',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
    },
    { field: 'model' },
    {
      field: 'price',
      cellStyle: { color: 'green' },
    },
    { field: 'electric' },
  ];

  ngOnInit(): void {
    console.log(this.colDefs);
    this.getRowStyle = (params: any) => {
      if (params.data.electric) {
        return { opacity: 0.8 };
      }
      return;
    };
    this.gridOptions = {
      isRowSelectable: (parms: any) => {
        return !parms.data.electric;
      },
    getRowStyle:(parms:any)=>{
      if(!parms.data.electric){

        return { background: 'red' };
      }
      return
    }
    };
  }

  setNavTitle() {
    this.service.setTabnavigateName({ name: 'Menu', modalName: 'Team Task' });
  }
}
