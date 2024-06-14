export interface Table {
    is_table_exist: boolean;
    table_id: {
      value: number | null;
      is_edit: boolean | null;
      type: string | null;
    };
    table_type: {
      value: string;
      is_edit: boolean;
      type: string;
    };
    table_name: {
      value: string;
      is_edit: boolean | null;
      type: string | null;
    };
    description: {
      value: string;
      is_edit: boolean | null;
      type: string | null;
    };
    attribute_count: {
      value: number | null;
      is_edit: boolean | null;
      type: string | null;
    };
    rows_count: {
      value: number | null;
      is_edit: boolean | null;
      type: string | null;
    };
    created_on: {
      value: string | null;
      is_edit: boolean | null;
      type: string | null;
    };
    created_by: {
      value: string | null;
      is_edit: boolean | null;
      type: string | null;
    };
    updated_on: {
      value: string | null;
      is_edit: boolean | null;
      type: string | null;
    };
    updated_by: {
      value: string | null;
      is_edit: boolean | null;
      type: string | null;
    };
    is_standard: {
      value: boolean | null;
      is_edit: boolean | null;
      type: string | null;
    };
    is_active: {
      value: boolean | null;
      is_edit: boolean | null;
      type: string | null;
    };
    property?: {
      is_edit: boolean;
      is_delete: boolean;
    };
    related_table?: { id: number; name: string }[] | null;
  }
  
  export interface ResData {
    data: Table[];
    total_record: number;
  }
  
  export interface ProductApiResponse {
    resData: ResData;
    status: boolean;
    message: string;
    tables_exist: boolean;
  }
  