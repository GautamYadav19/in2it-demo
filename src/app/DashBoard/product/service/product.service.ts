import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductApiResponse } from 'src/app/Interfaces/product-table.interface';
import { ProductDBdetail } from 'src/app/Interfaces/product-db-details';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  getProductData() {
    // return this.http.get<ProductApiResponse>('assets/product-data.json');
    const data = {
      resData: {
        data: [
          {
            is_table_exist: true,
            table_id: {
              value: 821,
              is_edit: false,
              type: 'integer',
            },
            table_type: {
              value: 'is_standard',
              is_edit: false,
              type: 'boolean',
            },
            table_name: {
              value: 'Configuration Item',
              is_edit: true,
              type: 'char',
            },
            description: {
              value: 'Configuration Items',
              is_edit: true,
              type: 'char',
            },
            attribute_count: {
              value: 7,
              is_edit: false,
              type: 'integer',
            },
            rows_count: {
              value: 5,
              is_edit: false,
              type: 'integer',
            },
            created_on: {
              value: '23/06/2023',
              is_edit: false,
              type: 'datetime',
            },
            created_by: {
              value: 'Shivank Tyagi',
              is_edit: false,
              type: 'many2one',
            },
            updated_on: {
              value: '23/06/2023',
              is_edit: false,
              type: 'datetime',
            },
            updated_by: {
              value: 'Shivank Tyagi',
              is_edit: false,
              type: 'many2one',
            },
            is_standard: {
              value: true,
              is_edit: false,
              type: 'boolean',
            },
            is_active: {
              value: true,
              is_edit: false,
              type: 'boolean',
            },
            property: {
              is_edit: true,
              is_delete: true,
            },
            related_table: [
              {
                id: 96,
                name: 'Users',
              },
              {
                id: 96,
                name: 'Users',
              },
            ],
          },
          {
            is_table_exist: true,
            table_id: {
              value: 825,
              is_edit: false,
              type: 'integer',
            },
            table_type: {
              value: 'is_standard',
              is_edit: false,
              type: 'boolean',
            },
            table_name: {
              value: 'Configuration Group',
              is_edit: true,
              type: 'char',
            },
            description: {
              value: 'Variant Configuration Group',
              is_edit: true,
              type: 'char',
            },
            attribute_count: {
              value: 6,
              is_edit: false,
              type: 'integer',
            },
            rows_count: {
              value: 0,
              is_edit: false,
              type: 'integer',
            },
            created_on: {
              value: '26/08/2023',
              is_edit: false,
              type: 'datetime',
            },
            created_by: {
              value: 'Gaurav Rautela',
              is_edit: false,
              type: 'many2one',
            },
            updated_on: {
              value: '26/08/2023',
              is_edit: false,
              type: 'datetime',
            },
            updated_by: {
              value: '',
              is_edit: false,
              type: 'many2one',
            },
            is_standard: {
              value: true,
              is_edit: false,
              type: 'boolean',
            },
            is_active: {
              value: true,
              is_edit: false,
              type: 'boolean',
            },
            property: {
              is_edit: true,
              is_delete: true,
            },
            related_table: [
              {
                id: 96,
                name: 'Users',
              },
              {
                id: 96,
                name: 'Users',
              },
            ],
          },
          {
            is_table_exist: false,
            table_id: null,
            table_type: {
              value: 'is_standard',
              is_edit: null,
              type: null,
            },
            table_name: {
              value: 'Product Family',
              is_edit: null,
              type: null,
            },
            description: {
              value: 'Product Family',
              is_edit: null,
              type: null,
            },
            attribute_count: null,
            rows_count: null,
            created_on: null,
            created_by: null,
            updated_on: null,
            updated_by: null,
            is_standard: null,
            is_active: null,
            property: null,
            related_table: null,
          },
          {
            is_table_exist: true,
            table_id: {
              value: 827,
              is_edit: false,
              type: 'integer',
            },
            table_type: {
              value: 'is_standard',
              is_edit: false,
              type: 'boolean',
            },
            table_name: {
              value: 'Product',
              is_edit: true,
              type: 'char',
            },
            description: {
              value: 'Products & Services',
              is_edit: true,
              type: 'char',
            },
            attribute_count: {
              value: 6,
              is_edit: false,
              type: 'integer',
            },
            rows_count: {
              value: 0,
              is_edit: false,
              type: 'integer',
            },
            created_on: {
              value: '26/08/2023',
              is_edit: false,
              type: 'datetime',
            },
            created_by: {
              value: 'Gaurav Rautela',
              is_edit: false,
              type: 'many2one',
            },
            updated_on: {
              value: '26/08/2023',
              is_edit: false,
              type: 'datetime',
            },
            updated_by: {
              value: '',
              is_edit: false,
              type: 'many2one',
            },
            is_standard: {
              value: true,
              is_edit: false,
              type: 'boolean',
            },
            is_active: {
              value: true,
              is_edit: false,
              type: 'boolean',
            },
            property: {
              is_edit: true,
              is_delete: true,
            },
            related_table: [
              {
                id: 96,
                name: 'Users',
              },
              {
                id: 96,
                name: 'Users',
              },
            ],
          },
          {
            is_table_exist: true,
            table_id: {
              value: 809,
              is_edit: false,
              type: 'integer',
            },
            table_type: {
              value: 'is_standard',
              is_edit: false,
              type: 'boolean',
            },
            table_name: {
              value: 'Variant',
              is_edit: true,
              type: 'char',
            },
            description: {
              value: 'Product Variant',
              is_edit: true,
              type: 'char',
            },
            attribute_count: {
              value: 11,
              is_edit: false,
              type: 'integer',
            },
            rows_count: {
              value: 5,
              is_edit: false,
              type: 'integer',
            },
            created_on: {
              value: '08/06/2023',
              is_edit: false,
              type: 'datetime',
            },
            created_by: {
              value: '',
              is_edit: false,
              type: 'many2one',
            },
            updated_on: {
              value: '26/06/2023',
              is_edit: false,
              type: 'datetime',
            },
            updated_by: {
              value: '',
              is_edit: false,
              type: 'many2one',
            },
            is_standard: {
              value: true,
              is_edit: false,
              type: 'boolean',
            },
            is_active: {
              value: true,
              is_edit: false,
              type: 'boolean',
            },
            property: {
              is_edit: true,
              is_delete: true,
            },
            related_table: [
              {
                id: 791,
                name: 'Product Family Category ',
              },
              {
                id: 793,
                name: 'Product ',
              },
              {
                id: 789,
                name: 'Product Family Type ',
              },
            ],
          },
          {
            is_table_exist: true,
            table_id: {
              value: 830,
              is_edit: false,
              type: 'integer',
            },
            table_type: {
              value: 'is_standard',
              is_edit: false,
              type: 'boolean',
            },
            table_name: {
              value: 'Product Family Type',
              is_edit: true,
              type: 'char',
            },
            description: {
              value: 'Product Family Type',
              is_edit: true,
              type: 'char',
            },
            attribute_count: {
              value: 7,
              is_edit: false,
              type: 'integer',
            },
            rows_count: {
              value: 0,
              is_edit: false,
              type: 'integer',
            },
            created_on: {
              value: '26/08/2023',
              is_edit: false,
              type: 'datetime',
            },
            created_by: {
              value: 'Gaurav Rautela',
              is_edit: false,
              type: 'many2one',
            },
            updated_on: {
              value: '26/08/2023',
              is_edit: false,
              type: 'datetime',
            },
            updated_by: {
              value: '',
              is_edit: false,
              type: 'many2one',
            },
            is_standard: {
              value: true,
              is_edit: false,
              type: 'boolean',
            },
            is_active: {
              value: true,
              is_edit: false,
              type: 'boolean',
            },
            property: {
              is_edit: true,
              is_delete: true,
            },
            related_table: [
              {
                id: 96,
                name: 'Users',
              },
              {
                id: 96,
                name: 'Users',
              },
            ],
          },
          {
            is_table_exist: true,
            table_id: {
              value: 832,
              is_edit: false,
              type: 'integer',
            },
            table_type: {
              value: 'is_standard',
              is_edit: false,
              type: 'boolean',
            },
            table_name: {
              value: 'Product Family Category',
              is_edit: true,
              type: 'char',
            },
            description: {
              value: 'Product Family Category',
              is_edit: true,
              type: 'char',
            },
            attribute_count: {
              value: 6,
              is_edit: false,
              type: 'integer',
            },
            rows_count: {
              value: 0,
              is_edit: false,
              type: 'integer',
            },
            created_on: {
              value: '26/08/2023',
              is_edit: false,
              type: 'datetime',
            },
            created_by: {
              value: 'Gaurav Rautela',
              is_edit: false,
              type: 'many2one',
            },
            updated_on: {
              value: '26/08/2023',
              is_edit: false,
              type: 'datetime',
            },
            updated_by: {
              value: '',
              is_edit: false,
              type: 'many2one',
            },
            is_standard: {
              value: true,
              is_edit: false,
              type: 'boolean',
            },
            is_active: {
              value: true,
              is_edit: false,
              type: 'boolean',
            },
            property: {
              is_edit: true,
              is_delete: true,
            },
            related_table: [
              {
                id: 96,
                name: 'Users',
              },
              {
                id: 96,
                name: 'Users',
              },
            ],
          },
          {
            is_table_exist: false,
            table_id: null,
            table_type: {
              value: 'is_standard',
              is_edit: null,
              type: null,
            },
            table_name: {
              value: 'Variant Config Group',
              is_edit: null,
              type: null,
            },
            description: {
              value: 'Variant Config Group',
              is_edit: null,
              type: null,
            },
            attribute_count: null,
            rows_count: null,
            created_on: null,
            created_by: null,
            updated_on: null,
            updated_by: null,
            is_standard: null,
            is_active: null,
            property: null,
            related_table: null,
          },
          {
            is_table_exist: false,
            table_id: null,
            table_type: {
              value: 'is_standard',
              is_edit: null,
              type: null,
            },
            table_name: {
              value: 'Config Options',
              is_edit: null,
              type: null,
            },
            description: {
              value: 'Config Options',
              is_edit: null,
              type: null,
            },
            attribute_count: null,
            rows_count: null,
            created_on: null,
            created_by: null,
            updated_on: null,
            updated_by: null,
            is_standard: null,
            is_active: null,
            property: null,
            related_table: null,
          },
          {
            is_table_exist: true,
            table_id: {
              value: 838,
              is_edit: false,
              type: 'integer',
            },
            table_type: {
              value: 'is_standard',
              is_edit: false,
              type: 'boolean',
            },
            table_name: {
              value: 'Service Component Config Option',
              is_edit: true,
              type: 'char',
            },
            description: {
              value: 'Service Component Config Option',
              is_edit: true,
              type: 'char',
            },
            attribute_count: {
              value: 7,
              is_edit: false,
              type: 'integer',
            },
            rows_count: {
              value: 0,
              is_edit: false,
              type: 'integer',
            },
            created_on: {
              value: '26/08/2023',
              is_edit: false,
              type: 'datetime',
            },
            created_by: {
              value: 'Gaurav Rautela',
              is_edit: false,
              type: 'many2one',
            },
            updated_on: {
              value: '26/08/2023',
              is_edit: false,
              type: 'datetime',
            },
            updated_by: {
              value: 'Gaurav Rautela',
              is_edit: false,
              type: 'many2one',
            },
            is_standard: {
              value: true,
              is_edit: false,
              type: 'boolean',
            },
            is_active: {
              value: true,
              is_edit: false,
              type: 'boolean',
            },
            property: {
              is_edit: true,
              is_delete: true,
            },
            related_table: [
              {
                id: 96,
                name: 'Users',
              },
              {
                id: 96,
                name: 'Users',
              },
            ],
          },
        ],
        total_record: 13,
      },
      status: true,
      message: 'Success',
      tables_exist: true,
    };
    return data;
  }
  getProductDBdetail() {
    return this.http.get<ProductDBdetail>(
      'assets/product-data-db-details.json'
    );
  }
}
