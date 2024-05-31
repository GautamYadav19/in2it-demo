import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css'],
})
export class MyTaskComponent implements OnInit {
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
  tabname!:string;
  tableData: any[] = [];
  addTaskForm!: FormGroup;
  addTaskFlag: boolean = false;
  editMode: boolean = false;
  todayDate: string;
  constructor(public fb: FormBuilder, private service: DataService) {
    this.getNavTitle()

    this.todayDate = new Date().toISOString().split('T')[0];
    console.log(this.todayDate);
  }
getNavTitle(){
  this.service.setTabnavigateName({name:'My task',modalName:'Menu'})
}
  ngOnInit(): void {
    this.addTaskFormInit();
    this.tableData = JSON.parse(localStorage.getItem('data') || '[]');
    this.service.tabNavigateName.subscribe()
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
  editTaskById(id: any) {
    this.editMode = true;
    localStorage.setItem('editId', JSON.stringify(id));
    this.addTaskForm.patchValue(this.tableData[id]);
  }

  listOfSelectedData: any[] = [];
  OnSelectData(id: any) {
    this.listOfSelectedData.push(id);
  }
  OnDeleteMultiData() {
    console.log(this.listOfSelectedData,this.listOfSelectedData.length)
    if (this.listOfSelectedData.length > 0) {
      var result = confirm('Want to delete?');
      if (result) {
        for (let i = 0; i < this.listOfSelectedData.length; i++) {
          console.log("loopdata",this.listOfSelectedData[i])
          this.service.deleteTask(this.listOfSelectedData[i]);
          this.tableData.splice(this.listOfSelectedData[i], 1);
        }
        this.listOfSelectedData=[]
      }
    }
  }
  onDelete(id: any) {
    var result = confirm('Want to delete?');
    if (result) {
      this.service.deleteTask(id);
      this.tableData.splice(id, 1);
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
    console.log(this.listOfSelectedData);
    if (this.addTaskForm.valid) {
      if (!this.editMode) {
        this.service.insertTask(this.addTaskForm.value);
        this.tableData.push(this.addTaskForm.value);
        this.addTaskForm.reset();
      } else {
        const existingData = JSON.parse(localStorage.getItem('data')!) || [];
        existingData[JSON.parse(localStorage.getItem('editId')!)] = null;
        existingData[JSON.parse(localStorage.getItem('editId')!)] =
          this.addTaskForm.value;
        localStorage.setItem('data', JSON.stringify(existingData));
        this.tableData = JSON.parse(localStorage.getItem('data') || '[]');
        this.addTaskForm.reset();
        this.editMode = false;
      }
      this.togglebtn();
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
