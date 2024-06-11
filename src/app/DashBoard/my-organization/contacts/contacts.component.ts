import { Component, OnInit } from '@angular/core';
import { OrgService } from '../service/org.service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';

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
  columnDef: ColDef[] = [
    {
      field: 'organization',
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    { field: 'name' },
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
        this.showtableData = this.search(data);
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
  newAddMore(): FormGroup {
    return this.fb.group({
      newFieldname: [''],
      newfield: [''],
    });
  }
  addMoreFn() {
    this.addmore.push(this.newAddMore());
  }
  // form array end
  onGridReady(params: any) {
    this.gridApi = params.api;
  }
  onSelectChange() {
    const selectRow = this.gridApi.getSelectedRows();
    if (selectRow && selectRow.length > 0) {
      for (let i = 0; i < selectRow.length; i++) {
        const ListData = this.showtableData.filter((field: any) => {
          return field.id === selectRow[i].id;
        });

        console.log('selectRow[i].id', selectRow[i].id, this.showtableData);
        const org = {
          orgId: selectRow[i].orgId,
          contact: ListData,
          contactIdForEdit: selectRow[i].id,
        };
        console.log(selectRow[i], ListData);
        this.storeSelectedData.push(org);
      }
    }
    if (selectRow.length == 1) {
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
      return field?.organization === filtername;
    });
    this.showtableData = dataList;
  }
  orgNameForPatch: any;
  getOrgMemberDataById(orgId: any, contactId: any, org?: any) {
    if (org !== undefined && org?.colDef?.field === 'name') {
      // this.togglebtn();
      this.toggle = true;
      this.openFormToggle = false;
      const ListData = this.showtableData.filter((field: any) => {
        return field.id === orgId.data.orgId;
      });
      this.navigateData = ListData;
      this.orgNameForPatch = ListData[0].organization;
      const contactData = ListData[0].contact.filter((field: any) => {
        return field.id === contactId.data.id;
      });
      this.rightCardData = contactData[0];
    } else if (org?.colDef?.field === 'name') {
      this.toggle = true;
      this.openFormToggle = false;
      const ListData = this.showtableData.filter((field: any) => {
        return field.id === orgId;
      });
      this.navigateData = ListData;
      this.orgNameForPatch = ListData[0].organization;
      const contactData = ListData[0].contact.filter((field: any) => {
        return field.id === contactId;
      });
      this.rightCardData = contactData[0];
    }
  }
  navigateData: any;
  navigateToOrganization(org: any) {
    if (org.colDef.field === 'organization') {
      const ListData = this.showtableData.filter((field: any) => {
        return field.id === org.data.orgId;
      });

      const state = { data: ListData[0], id: ListData[0].id };
      this.router.navigateByUrl('/organization', { state });
    }
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
    const roleList: any[] = [];
    const lisfOfRoles = this.tableData.filter((data: any) => {
      return data.organization === orgName.value;
    });
    const restrictedValue = 'Developer';
    const listOfValidRoles = lisfOfRoles[0].contact.some((data: any) => {
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
    // const extractContacttable =[]
    // for (let i = 0; i < this.showtableData.length; i++) {
    //   for (let j = 0; j < this.showtableData[i].contact.length; j++) {
    //  this.showtableData[i].contact[j]['organization']=this.showtableData[i].organization;
    //   extractContacttable.push(this.showtableData[i].contact[j])
    //   }
    // }
    // this.rowData = extractContacttable
    this.rowData = this.showtableData.flatMap((org: any) =>
      org.contact.map((contact: any) => ({
        ...contact,
        orgId: org.id,
        organization: org.organization,
        ...this.showtableData,
      }))
    );

    this.getAllOrgdropdown();
  }

  editMode: boolean = false;
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

  // selectData(orgId: any, contactData: any) {
  //   const existingIndex = this.storeSelectedData.findIndex((data: any) => {
  //     return data.orgId === orgId.id && data.contact === contactData;
  //   });

  //   if (existingIndex !== -1) {
  //     this.storeSelectedData.splice(existingIndex, 1);
  //   } else {
  //     const org = {
  //       orgId: orgId.id,
  //       contact: contactData,
  //     };

  //     this.storeSelectedData.push(org);
  //   }
  //   this.checkBoxDisableBtn =
  //     this.storeSelectedData.length === 1 ? false : true;
  // }
  isCheckedSelectAll: boolean = false;

  // selectAllData() {
  //   this.isCheckedSelectAll = !this.isCheckedSelectAll;
  //   if (this.isCheckedSelectAll) {
  //     this.showtableData.forEach((orgData: any) => {
  //       orgData?.contact.forEach((contact: any) => {
  //         const org = {
  //           orgId: orgData.id,
  //           contact: [contact],
  //         };
  //         this.storeSelectedData.push(org);
  //       });
  //     });
  //     this.storeSelectedData.forEach((data: any) => {
  //       this.selectCheckBox(data.orgId);
  //     });

  //     // return true
  //   } else {
  //     this.storeSelectedData = [];
  //   }
  // }
  // selectCheckBox(id: number, contactID?: number) {
  //   return this.storeSelectedData.some((data: any) => {
  //     return data.orgId == id && data.contact[0]?.id == contactID;
  //   });
  // }

  deleteMultipleData() {
    console.log(this.storeSelectedData, 'sdfd');
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
    console.log(this.showtableData);
    this.storeSelectedData = [];
    this.checkBoxDisableBtn = true;
  }

  editSelectedData() {
    const checkLength = this.storeSelectedData.length;
    const selectRow = this.gridApi.getSelectedRows();

    if (!this.checkBoxDisableBtn) {
      let orgId = this.storeSelectedData[0]?.orgId;
      let contactId = this.storeSelectedData[0].contactIdForEdit;
      this.getOrgMemberDataById(orgId, contactId);
      this.openFormToggleFn(true);
      this.storeSelectedData = [];
      this.checkBoxDisableBtn = true;
    }
  }
  filter = new FormControl('');

  search(text: string) {
    const term = text?.toLowerCase();
    let result: any[] = [];

    this.showtableData.forEach((org: any) => {
      const filteredContacts = org.contact.filter((contact: any) => {
        return contact.name?.toLowerCase().includes(term);
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
