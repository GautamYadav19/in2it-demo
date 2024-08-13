import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'folder_structure_demo';
  constructor(){
    let obj={
      name:"test",
      arrow:()=>{
          console.log(this)
      },
      fn:()=>{
          console.log(this)
      }
      
  }
  obj.fn();
  obj.arrow();
  }
}
