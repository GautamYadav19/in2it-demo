import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-btn-custom',
  templateUrl: './btn-custom.component.html',
  styleUrls: ['./btn-custom.component.css'],
})
export class BtnCustomComponent implements OnInit {
  @Input() name!: string;
  @Output() editMode = new EventEmitter<boolean>();

  constructor() {}

  EditFn() {
    this.editMode.emit(true);
  }
  ngOnInit(): void {}
}
