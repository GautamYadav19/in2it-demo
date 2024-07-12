import { Component,  } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { GridApi, ICellRendererParams } from 'ag-grid-community';
import { ProductService } from 'src/app/DashBoard/product/service/product.service';

@Component({
  selector: 'app-custom-product-btn',
  templateUrl: './custom-product-btn.component.html',
  styleUrls: ['./custom-product-btn.component.css'],
})
export class CustomProductBtnComponent
  implements  ICellRendererAngularComp
{
  params: any;
  oldData: any;
  gridApi!: GridApi;
  constructor(private productService: ProductService) {}
  agInit(params: ICellRendererParams<any, any>): void {
    this.params = params;
  }
  refresh(params: ICellRendererParams<any, any>): boolean {
    return true;
  }

  store: any[] = [];
 
// ======================old =====================
  // startEditing() {
  //   this.params.data.editMode = true;
  //   console.log(this.params.data);
    
  //   this.params.data.oldData = {oldOnedata:{...this.params.data}}
  //   console.log(this.params,this.params.data.oldData);
  // }

  // cancel() {
  //   console.log(this.params,this.params.data.oldData);
  //   if (!this.params.data.createMode) {
  //     this.params.data.editMode = false;
  //     // this.params.context.parentComponent.cancel(this.params.data);
  //     // this.params.context.parentComponent.getProductDetails();
  //     this.params.data = this.params.data.oldData;
  //   } else {
  //     delete this.params.data.createMode;
  //     this.params.context.parentComponent.delete(this.params.data);
  //     this.params.api.applyTransaction({ remove: [this.params.node.data] });
  //   }
  // }
  // =======================old=======================
  startEditing() {
    // Store a deep copy of the current data
    this.params.data.oldData = JSON.parse(JSON.stringify(this.params.data));
    
    // Now edit mode can be set
    this.params.data.editMode = true;
    
 
  }
  
  cancel() {
    // Restore the original data from oldData
    if (!this.params.data.createMode) {
      // If not in create mode, revert to old data
      Object.assign(this.params.data, this.params.data.oldData);
      this.params.data.editMode = false;
      
    }else{
      delete this.params.data.createMode;
      this.params.context.parentComponent.delete(this.params.data);
      this.params.api.applyTransaction({ remove: [this.params.node.data] });
    }
  }

  delete() {
    this.params.data.editMode = false;
    this.params.context.parentComponent.delete(this.params.data);
  }
  save() {
    if (!this.params.data.createMode) {
      this.params.data.editMode = false;
    } else {
      delete this.params.data.createMode;
    }
    this.params.context.parentComponent.save(this.params.data);
  }
}
