import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-para',
  templateUrl: './index-para.component.html',
  styleUrls: ['./index-para.component.css'],
})
export class IndexParaComponent implements OnInit {
  para: any;

  params: any;
  componentRenderId: any;
  editcomponentRenderId: any;
  editMode: boolean = false;
  isEditable: boolean = true;
  cellInit(params: any, id: any) {
    this.params = params;
    this.componentRenderId = id;
  }
  editCellInit(params: any, id: any) {
    this.editcomponentRenderId = id;
  }
  shareData(data: any) {
    this.para = data;
  }
  editModeFn(mode: any) {
    //id - mode
    this.editMode = mode;
    this.params.parentRef.makeComponentEdit(mode, this.componentRenderId);
  }
  ngOnInit(): void {}
}
