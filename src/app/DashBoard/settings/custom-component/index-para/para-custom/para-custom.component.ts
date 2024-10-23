import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-para-custom',
  templateUrl: './para-custom.component.html',
  styleUrls: ['./para-custom.component.css'],
})
export class ParaCustomComponent implements OnInit {
  @Input() para: string = '123';
  @Output() editMode = new EventEmitter<boolean>();
  editModeFn() {
    this.editMode.emit(true);
  }
  ngOnInit(): void {}
}
