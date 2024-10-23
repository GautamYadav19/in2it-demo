import { Directive, Input, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appEditDataTransfer]',
})
export class EditDataTransferDirective {
  @Input() component: any;
  @Input() params: any;
  @Input() id: any;

  ref: any;
  constructor(private el: ViewContainerRef) {}
  ngOnInit(): void {
    this.el.clear();
    this.ref = this.el.createComponent(this.component);
    this.ref.instance.editCellInit(this.params, this.id);
  }
}
