import { Component, OnInit } from '@angular/core';
import { OrgService } from '../service/org.service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { CustomCellComponent } from 'src/app/Shared/shared/ag-grid-table/custom-cell/custom-cell.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  active!: number;
  toggle: boolean = false;
  newFromToggleBtn: boolean = false;
  editformToggleBtn: boolean = false;
  openFormToggle: boolean = false;
  checkBoxDisableBtn: boolean = true;
  filter = new FormControl('');

  navs = [
    {
      id: 0,
      organization: 'Contact',
      email: '',
      industry: '',
      onboarding: '',
      orgSPOC: '',
      phone: '',
      products: '',
      relatedOrgs: '',
      type: '',
    },
  ];
  role = ['Developer', 'Designer', 'Project Manager', 'Data Analyst'];
  listOfRole: any;
  codes = ['+91', '+94', '+27'];
  showtableData: any = [];
  tableData: any = [];
  state: any;
  rightCardData: any;
  orgDropdown: any;
  flagForOrgDropdown: boolean = false;

  orgForm!: FormGroup;

  gridoptions!: GridOptions;
  orgNameForPatch: any;
  editMode: boolean = false;

  singlenameOrg: any;
  columnDef: ColDef[] = [
    {
      field: 'organization',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      cellRenderer: CustomCellComponent,
    },
    { field: 'name', cellRenderer: CustomCellComponent },
    { field: 'role' },
    { field: 'email' },
    { field: 'phoneNumber' },
  ];
  rowData: any;
  gridApi!: GridApi;

  constructor(
    private orgServie: OrgService,
    public router: Router,
    private fb: FormBuilder
  ) {
    this.filter.valueChanges.subscribe((data: any) => {
      if (data.length > 0) {
        this.rowData = this.search(data).flatMap((org: any) =>
          org.contact.map(
            (contact: any) => (
              (this.singlenameOrg = this.showtableData),
              {
                ...contact,
                orgId: org.id,
                organization: org.organization,
                ...this.showtableData,
              }
            )
          )
        );
      } else {
        this.getTableList();
      }
    });
  }

  ngOnInit(): void {
    this.getTableList();
    this.initNewFrom();
    this.getAllOrgdropdown();
    this.state = history.state;
    this.gridoptions = {
      context: {
        parentComponent: this,
        parent: 'contact',
      },
    };
  }
  initNewFrom() {
    this.orgForm = this.fb.group({
      id: [''],
      name: this.fb.group({
        fname: [''],
        lname: [''],
      }),
      org: [''],
      email: [''],
      number: this.fb.group({
        code: [''],
        phoneNumber: [''],
      }),

      role: [''],
      additionalrole: [''],
      addmorefield: this.fb.array([]),
      remark: [''],
    });
  }
  // form array start
  get addmore(): FormArray {
    return this.orgForm.get('addmorefield') as FormArray;
  }
 
  addMoreFn() {
    this.addmore.push(this.newAddMore());
  }
  newAddMore(): FormGroup {
    return this.fb.group({
      newFieldname: [''],
      newfield: [''],
    });
  }
  // form array end
  onGridReady(params: any) {
    this.gridApi = params.api;
  }
  onSelectChange(selectRow: any) {
    if (selectRow && selectRow.length > 0) {
      for (let i = 0; i < selectRow.length; i++) {
        const ListData = this.showtableData.filter((field: any) => {
          return field.id === selectRow[i].id;
        });

        const org = {
          orgId: selectRow[i].orgId,
          contact: ListData,
          contactIdForEdit: selectRow[i].id,
        };
        this.storeSelectedData.push(org);
      }
    }
    if (selectRow?.length == 1) {
      this.checkBoxDisableBtn = false;
    } else {
      this.checkBoxDisableBtn = true;
    }
  }

  // filters to show table data
  filterData(filtername: any) {
    this.flagForOrgDropdown = true;
    this.orgDropdown = filtername;

    const dataList = this.tableData.filter((field: any) => {
      // Check if field.organization is not null and matches filtername
      return field.organization !== null && field.organization === filtername;
    });

   this.showtableData = dataList;
    this.rowData = this.showtableData.flatMap((org: any) =>
      org.contact.map(
        (contact: any) => (
          (this.singlenameOrg = this.showtableData),
          {
            ...contact,
            orgId: org.id,
            organization: org.organization,
            ...this.showtableData,
          }
        )
      )
    );
  }

  getOrgMemberDataById(orgId: any, contactId: any, org?: any) {
    this.toggle = true;
    this.openFormToggle = false;

    const ListData = this.showtableData.filter((field: any) => {
      return field.id === orgId;
    });
    
    this.orgNameForPatch = ListData[0].organization;
    const contactData = ListData[0].contact.filter((field: any) => {
      return field.id === contactId;
    });
    console.log("contactData",contactData);

    this.rightCardData = contactData[0];
    // }
  }
  navigateToOrganization(org: any) {
    const ListData = this.showtableData.filter((field: any) => {
      return field.id === org.orgId;
    });
    const state = { data: ListData[0], id: ListData[0].id };
    this.router.navigateByUrl('/organization', { state });
  }
  // filters for form
  getAllOrgdropdown() {
    const orgList: any[] = [];
    this.tableData.forEach((data: any) => {
      orgList.push(data.organization);
    });
    const uniqueOrgs = [...new Set(orgList)];
    this.orgDropdown = uniqueOrgs;
  }

  getRoles(orgName: any) {
    const singleData = this.tableData.filter((data: any) => {
      return data.organization === orgName.value;
    });

    const restrictedValue = 'Developer';
    const listOfValidRoles = singleData[0].contact.some((data: any) => {
      return data.role === restrictedValue;
    });
    
    if (listOfValidRoles) {
      const role1 = this.role.filter((data: any) => {
        return data !== restrictedValue;
      });
      this.listOfRole = role1;
    } else {
      this.listOfRole = this.role;
    }
  }

  // new form
  newForm() {
    this.togglebtn();
    this.orgForm.reset();
  }

  // show table data
  getTableList() {
    this.tableData = this.showtableData = this.orgServie.getAllList();
    this.flagForOrgDropdown = false;

    this.rowData = this.showtableData.flatMap((org: any) =>
      org.contact.map(
        (contact: any) => (
          (this.singlenameOrg = this.showtableData),
          {
            ...contact,
            orgId: org.id,
            organization: org.organization,
            ...this.showtableData,
          }
        )
      )
    );

    this.getAllOrgdropdown();
  }

  initEditForm() {
    this.editMode = true;
    const data = this.rightCardData;
    // yaha data algh terha se a raha hain isliya esa karna requied hain
    const fname = data?.name.split(' ')[0];
    const lname = data?.name.split(' ')[1];
    const code = data?.phoneNumber.split(' ')[0];
    const phoneNumber = data?.phoneNumber.split(' ')[1];
    this.orgForm.patchValue({
      id: this.rightCardData?.id,
      name: {
        fname: fname,
        lname: lname,
      },
      org: this.orgNameForPatch,
      email: data?.email,
      number: {
        code: code,
        phoneNumber: phoneNumber,
      },

      role: data?.role,
      additionalrole: data?.additionalrole,
      remark: data?.remark,
    });
  }
  onSubmit(index?: any) {
    if (!this.editMode) {
      const saveData = {
        additionalrole: this.orgForm.value.additionalrole,
        email: this.orgForm.value.email,
        id: Math.floor(Math.random() * (100 - 0 + 1)) + 0,
        name:
          this.orgForm.value.name.fname + ' ' + this.orgForm.value.name.lname,
        phoneNumber:
          this.orgForm.value.number.code +
          this.orgForm.value.number.phoneNumber,
        role: this.orgForm.value.role,
      };
      const org = this.showtableData.filter((data: any) => {
        return data.organization === this.orgForm.value.org;
      });
      org[0].contact.push(saveData);
      this.rowData = this.showtableData.flatMap((org: any) =>
        org.contact.map((contact: any) => ({
          ...contact,
          orgId: org.id,
          organization: org.organization,
          ...this.showtableData,
        }))
      );
    } else {
      const saveData = {
        additionalrole: this.orgForm.value.additionalrole,
        email: this.orgForm.value.email,
        id: this.orgForm.value.id,
        name:
          this.orgForm.value.name.fname + ' ' + this.orgForm.value.name.lname,
        phoneNumber:
          this.orgForm.value.number.code +
          this.orgForm.value.number.phoneNumber,
        role: this.orgForm.value.role,
      };
      const org = this.showtableData.filter((data: any) => {
        return data.organization === this.orgForm.value.org;
      });
      const i = org[0].contact.findIndex((data: any) => {
        return data.id === this.orgForm.value.id;
      });
      org[0].contact.splice(i, 1, saveData);
      this.editMode = false;
      this.storeSelectedData.length = 0;
      this.checkBoxDisableBtn = true;
      this.rowData = this.showtableData.flatMap((org: any) =>
        org.contact.map((contact: any) => ({
          ...contact,
          orgId: org.id,
          organization: org.organization,
          ...this.showtableData,
        }))
      );
    }
    this.orgForm.reset();

    this.openFormToggle = this.toggle = false;
  }

  togglebtn() {
    this.toggle = true;
  }

  cancel() {
    this.orgForm.reset();
    this.storeSelectedData.length = 0;
    this.checkBoxDisableBtn = true;
    this.openFormToggle = this.toggle = false;
  }

  clear() {
    this.orgForm.reset();
  }
  openFormToggleFn(edit = false) {
    this.toggle = this.openFormToggle = !this.openFormToggle;
    if (edit) {
      this.initEditForm();
    }
  }

  storeSelectedData: any = [];

  isCheckedSelectAll: boolean = false;

  deleteMultipleData() {
    this.storeSelectedData.forEach((storedata: any) => {
      const filter = this.showtableData.filter((data: any) => {
        return data.id === storedata.orgId;
      });

      const id = filter[0].contact.findIndex((data: any) => {
        return data.id == storedata.contact.id;
      });
      filter[0].contact.splice(id, 1);
    });
    this.rowData = this.showtableData.flatMap((org: any) =>
      org.contact.map((contact: any) => ({
        ...contact,
        orgId: org.id,
        organization: org.organization,
        ...this.showtableData,
      }))
    );
    this.storeSelectedData = [];
    this.checkBoxDisableBtn = true;
  }

  editSelectedData() {
    if (!this.checkBoxDisableBtn) {
      let orgId = this.storeSelectedData[0]!.orgId;
      let contactId = this.storeSelectedData[0].contactIdForEdit;
      this.getOrgMemberDataById(orgId, contactId);
      this.openFormToggleFn(true);
      this.storeSelectedData = [];
      this.checkBoxDisableBtn = true;
    }
  }

  search(text: string) {
    const term = text!.toLowerCase();
    let result: any[] = [];

    this.showtableData.forEach((org: any) => {
      const filteredContacts = org.contact.filter((contact: any) => {
        return contact.name!.toLowerCase().includes(term);
      });

      if (filteredContacts.length > 0) {
        filteredContacts.forEach((contact: any) => {
          result.push({
            organization: org.organization,
            email: org.email,
            id: org.id,
            industry: org.industry,
            onboarding: org.onboarding,
            orgSPOC: org.orgSPOC,
            phone: org.phone,
            products: org.products,
            relatedOrgs: org.relatedOrgs,
            type: org.type,
            contact: [contact],
          });
        });
      }
    });

    return result;
  }
}
