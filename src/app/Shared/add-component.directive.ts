import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAddComponent]',
})
export class AddComponentDirective implements OnInit {
  @Input() componentName: any;
  @Input() data: any;
  @Input() api: any;
  ref: any;
  constructor(private el: ViewContainerRef) {}
  ngOnInit(): void {
    this.el?.clear();
    this.ref = this.el.createComponent(this.componentName);
    this.ref.instance.cellInit(this.data, this.componentName, this.api);
  }
}
