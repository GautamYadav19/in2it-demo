import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../service/data.service';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { CustomCellComponent } from 'src/app/Shared/shared/ag-grid-table/custom-cell/custom-cell.component';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css'],
})
export class MyTaskComponent implements OnInit {
  rowData!: any;
  colDefs!: ColDef[];
  items = [
    {
      icon: 'user',
      title: 'Assign to me',
      count: '1',
    },
    {
      icon: 'menu',
      title: 'In Queue',
      count: '55',
    },
    {
      icon: 'slack',
      title: 'Overdue',
      count: '56',
    },
    {
      icon: 'Star',
      title: 'Priority',
      count: '46',
    },
  ];
  tabname!: string;
  tableData: any[] = [];
  addTaskForm!: FormGroup;
  addTaskFlag: boolean = false;
  editMode: boolean = false;
  todayDate: string;
  rowClass!: string;
  rowClassRules!: any;
  rowStyle!: any;
  listOfSelectedData: any[] = [];
  gridApi: GridApi | undefined;
  pagination!: boolean;
  paginationPageSize!: number;
  gridOptions!: GridOptions;

  constructor(public fb: FormBuilder, private service: DataService) {
    this.getNavTitle();
    this.todayDate = new Date().toISOString().split('T')[0];
  }
  getNavTitle() {
    this.service.setTabnavigateName({ name: 'My task', modalName: 'Menu' });
  }
  ngOnInit(): void {
    this.addTaskFormInit();
    this.getTableData();
    this.initPagination();
    this.service.tabNavigateName.subscribe();
    this.gridOptions = {
      context: {
        parentComponent: this,
        parent: 'mytask',
      },
    };
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
  }
  onSelectionChanged() {
    const selectedRows = this.gridApi?.getSelectedRows();
    if (selectedRows && selectedRows.length > 0) {
      this.listOfSelectedData.push(selectedRows[0].fieldId);
    }
  }
  initPagination() {
    this.pagination = true;
    this.paginationPageSize = 2;
  }

  getTableData() {
    this.tableData = JSON.parse(localStorage.getItem('data') || '[]');
    this.rowData = this.tableData;

    this.colDefs = [
      {
        headerName: 'field Id',
        field: 'fieldId',
        checkboxSelection: true,
        width: 155,
      },
      { headerName: 'task Name', field: 'taskName', width: 155 },
      { headerName: 'task Id', field: 'taskId', width: 155 },
      { headerName: 'solution Area', field: 'solutionArea', width: 155 },
      {
        headerName: 'status',
        field: 'status',
        width: 150,
        cellStyle: (data: any) => {
          return data.value == 'In Progress'
            ? { background: 'yellow' }
            : data.value == 'Active'
            ? { background: 'green' }
            : { background: 'blue' };
        },
      },
      { headerName: 'start Date', field: 'startDate' },
      { headerName: 'due Date', field: 'dueDate' },
      {
        headerName: 'priority',
        field: 'priority',
        width: 100,
        cellStyle: (data: any) => {
          return data.value == 'Low'
            ? { background: 'red' }
            : data.value == 'High'
            ? { background: 'blue' }
            : { background: 'green' };
        },
      },
      { headerName: 'workflow', field: 'workflow' },
      {
        headerName: 'Action',
        field: 'Action',
        width: 155,
        cellRenderer: CustomCellComponent,
      },
    ];
  }

  addTaskFormInit() {
    this.addTaskForm = this.fb.group({
      fieldId: ['', [Validators.required]],
      solutionArea: ['', [Validators.required]],
      workflow: ['', [Validators.required]],
      taskId: ['', [Validators.required]],
      taskName: ['', [Validators.required]],
      status: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      priority: ['', [Validators.required]],
    });
  }
  editTaskById(params: any) {
    const id = params.data.fieldId;
    this.editMode = true;
    localStorage.setItem('editId', JSON.stringify(id));

    const index = this.tableData.findIndex((data: any) => {
      return data.fieldId === id;
    });
    this.addTaskForm.patchValue(this.tableData[index]);
  }

  OnSelectData(id: any) {
    this.listOfSelectedData.push(id);
  }
  OnDeleteMultiData() {
    if (this.listOfSelectedData.length > 0) {
      var result = confirm('Want to delete?');
      if (result) {
        for (let i = 0; i < this.listOfSelectedData.length; i++) {
          this.service.deleteTask(this.listOfSelectedData[i]);
          this.tableData.splice(this.listOfSelectedData[i], 1);
        }
        this.listOfSelectedData = [];
      }
    }
    this.getTableData();
  }

  onDelete(params: any) {
    const id = params.data.fieldId;
    var result = confirm('Want to delete?');
    if (result) {
      this.service.deleteTask(id);
      this.tableData.splice(id, 1);
      this.getTableData();
    }
  }
  
  togglebtn() {
    this.addTaskFlag = !this.addTaskFlag;
  }

  clear() {
    this.addTaskForm.reset();
  }
  OnCanel() {
    this.togglebtn();
    this.clear();
  }
  onSubmit() {
    if (this.addTaskForm.valid) {
      if (!this.editMode) {
        this.service.insertTask(this.addTaskForm.value);
        this.tableData.push(this.addTaskForm.value);
        this.addTaskForm.reset();
      } else {
        // edit on
        const existingData = JSON.parse(localStorage.getItem('data')!) || [];
        const id = JSON.parse(localStorage.getItem('editId')!);
        const index = existingData.findIndex((data: any) => {
          return data.fieldId === id;
        });
        existingData[index] = null;
        existingData[index] = this.addTaskForm.value;
        localStorage.setItem('data', JSON.stringify(existingData));
        this.tableData = JSON.parse(localStorage.getItem('data') || '[]');
        this.addTaskForm.reset();
        this.editMode = false;
      }
      this.togglebtn();
      this.getTableData();
    } else {
      Object.keys(this.addTaskForm.controls).forEach((data) => {
        const control = this.addTaskForm.get(data);
        if (control) {
          control.markAsTouched({ onlySelf: true });
        }
      });
    }
  }
}
