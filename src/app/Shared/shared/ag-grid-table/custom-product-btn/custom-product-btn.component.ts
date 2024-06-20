import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { GridApi, ICellRendererParams } from 'ag-grid-community';
import { Subject } from 'rxjs';
import { ProductService } from 'src/app/DashBoard/product/service/product.service';

@Component({
  selector: 'app-custom-product-btn',
  templateUrl: './custom-product-btn.component.html',
  styleUrls: ['./custom-product-btn.component.css'],
})
export class CustomProductBtnComponent
  implements OnInit, ICellRendererAngularComp
{
  params: any;
  flag!: boolean;

  gridApi!: GridApi;
  constructor(private productService: ProductService) {}
  agInit(params: ICellRendererParams<any, any>): void {
    this.params = params;
    this.gridApi = this.params.context.parentComponent.gridApi;
    this.flag = this.params.context.parentComponent.flag;
  }
  refresh(params: ICellRendererParams<any, any>): boolean {
    return true;
  }

  ngOnInit(): void {}
  store: any[] = [];
  startEditing() {
    this.productService.setProductFlag(this.params);
    // this.productService.openclickProduct.subscribe((data) => {
    //   console.log(data);
      
    // });
    // console.log("this.store",this.store);
    // this.store.push(this.params);
    // this.productService.setOpenclickProduct(this.params)
    // console.log(this.store);
    
    this.params.context.parentComponent.onBtStartEditing(this.params);
    console.log("context.parentComponent.",this.params);
    
    this.flag = this.params.context.parentComponent.flag;
  }
  save() {
    this.params.context.parentComponent.save(this.params.data);
    this.flag = this.params.context.parentComponent.flag;
  }
  cancel() {
    this.params.context.parentComponent.cancel(this.params.data);
    this.flag = this.params.context.parentComponent.flag;
  }
  delete() {
    this.params.context.parentComponent.delete(this.params.data);
    this.flag = this.params.context.parentComponent.flag;
  }
}
