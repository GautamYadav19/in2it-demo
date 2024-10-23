import {
  ComponentFactoryResolver,
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appAddComponent]',
})
export class AddComponentDirective implements OnInit {
  @Input() componentName: any;
  componentChange = new Subject();
  setValue(data: any) {
    this.componentChange.next(data);
  }

  ref: any;

  constructor(private el: ViewContainerRef) {}

  ngOnInit(): void {
    this.el.clear();
    this.ref = this.el.createComponent(this.componentName);
    this.ref.instance.cellInit(this);
  }
}
