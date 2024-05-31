import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-team-task',
  templateUrl: './team-task.component.html',
  styleUrls: ['./team-task.component.css']
})
export class TeamTaskComponent implements OnInit {

  constructor( private service: DataService) { 
    this.setNavTitle()

  }

  ngOnInit(): void {
  }
  setNavTitle(){
    this.service.setTabnavigateName({name:'Menu',modalName:'Team Task'})
  }
}
