import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drop-down-custom',
  templateUrl: './drop-down-custom.component.html',
  styleUrls: ['./drop-down-custom.component.css'],
})
export class DropDownCustomComponent implements OnInit {
  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }
  ngOnInit(): void {}
}
