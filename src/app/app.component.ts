import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'folder_structure_demo';
  constructor() {}
  external: string = '';
  ngOnInit(): void {}
  onSubmit(form: NgForm) {
    console.log(form.value);
  }
}
