import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AddComponentDirective } from 'src/app/Shared/add-component.directive';

@Component({
  selector: 'app-edit-para',
  templateUrl: './edit-para.component.html',
  styleUrls: ['./edit-para.component.css'],
})
export class EditParaComponent implements OnInit {
  para!: string;
  @Output() shareData = new EventEmitter<any>();
  ngOnInit(): void {}

  save() {
    this.shareData.emit(this.para);
  }
}
