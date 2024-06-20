import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ProductService } from 'src/app/DashBoard/product/service/product.service';

@Component({
  selector: 'app-table-input-name',
  templateUrl: './table-input-name.component.html',
  styleUrls: ['./table-input-name.component.css'],
})
export class TableInputNameComponent
  implements OnInit, ICellRendererAngularComp
{
  fieldName: any;
  params: any;
  data!: any;
  flag: boolean = true;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    if (this.fieldName === 'table_name.value') {
      this.productService.openclickProduct.subscribe((data) => {
        
        this.data = data;
        console.log(data,"data")
        this.flag = false
      });
    }
  }
  agInit(params: ICellRendererParams<any, any>): void {
    this.params = params;

    this.fieldName = params.colDef?.field;
  }
  refresh(params: ICellRendererParams<any, any>): boolean {
    console.log(params);

    return true;
  }
}
