import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-edit-btn',
  templateUrl: './edit-btn.component.html',
  styleUrls: ['./edit-btn.component.css'],
})
export class EditBtnComponent implements OnInit {
  name!: string;
  @Output() shareData = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  save() {
    this.shareData.emit(this.name);
  }
}
