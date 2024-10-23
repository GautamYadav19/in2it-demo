import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-btn-custom',
  templateUrl: './index-btn-custom.component.html',
  styleUrls: ['./index-btn-custom.component.css'],
})
export class IndexBtnCustomComponent implements OnInit {
  btnname!: string;
  editModeBtn: boolean = false;
  editModeBtnFn(mode: boolean) {
    this.editModeBtn = mode;
  }
  shareDataBtn(data: any) {
    this.btnname = data;
  }
  ngOnInit(): void {}
  cellInit(params: any) {}
}
