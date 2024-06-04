import { Component, OnInit } from '@angular/core';
import { OrgService } from '../service/org.service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
  constructor(
    private orgServie: OrgService,
    public router: Router,
    private fb: FormBuilder
  ) {
    this.filter.valueChanges.subscribe((data: any) => {
      if (data.length > 0) {
        this.showtableData = this.search(data);
        console.log('search data', this.showtableData);
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
  getOrgMemberDataById(orgId: any, contactId: any) {
    // this.togglebtn();
    this.toggle = true;
    this.openFormToggle = false;
    const ListData = this.showtableData.filter((field: any) => {
      return field.id === orgId;
    });
    this.orgNameForPatch = ListData[0].organization;
    const contactData = ListData[0].contact.filter((field: any) => {
      return field.id === contactId;
    });
    this.rightCardData = contactData[0];
    console.log(this.rightCardData);
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
      console.log('in condition', role1);
      this.listOfRole = role1;
    } else {
      console.log('Out condition', this.role);
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

    this.getAllOrgdropdown();
  }
  editMode: boolean = false;
  initEditForm() {
    console.log(this.rightCardData);
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
      console.log(this.orgForm.value);
      const org = this.showtableData.filter((data: any) => {
        return data.organization === this.orgForm.value.org;
      });
      org[0].contact.push(saveData);
      console.log(saveData);
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
      console.log('ss', this.orgForm.value.id, saveData);
      const i = org[0].contact.findIndex((data: any) => {
        return data.id === this.orgForm.value.id;
      });
      org[0].contact.splice(i, 1, saveData);
      this.editMode = false;
      this.storeSelectedData.length = 0;
      this.checkBoxDisableBtn = true;
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

    console.log(this.storeSelectedData.length);
    this.openFormToggle = this.toggle = false;
  }
  clear() {
    this.orgForm.reset();
  }
  openFormToggleFn(edit = false) {
    this.toggle = this.openFormToggle = !this.openFormToggle;
    console.log('this.openFormToggle', this.openFormToggle);
    if (edit) {
      this.initEditForm();
    }
  }

  storeSelectedData: any = [];

  selectData(orgId: any, contactData: any) {
    const existingIndex = this.storeSelectedData.findIndex((data: any) => {
      return data.orgId === orgId.id && data.contact === contactData;
    });

    if (existingIndex !== -1) {
      this.storeSelectedData.splice(existingIndex, 1);
      console.log('s', this.storeSelectedData);
    } else {
      const org = {
        orgId: orgId.id,
        contact: contactData,
      };

      this.storeSelectedData.push(org);
    }
    this.checkBoxDisableBtn =
      this.storeSelectedData.length === 1 ? false : true;
  }
  isCheckedSelectAll: boolean = false;

  selectAllData() {
    this.isCheckedSelectAll = !this.isCheckedSelectAll;
    if (this.isCheckedSelectAll) {
      this.showtableData.forEach((orgData: any) => {
        orgData?.contact.forEach((contact: any) => {
          const org = {
            orgId: orgData.id,
            contact: [contact],
          };
          this.storeSelectedData.push(org);
        });
      });
      console.log('selectAll', this.storeSelectedData);
      this.storeSelectedData.forEach((data: any) => {
        this.selectCheckBox(data.orgId);
      });

      // return true
    } else {
      this.storeSelectedData = [];
    }
  }
  selectCheckBox(id: number,contactID?:number) {
    return this.storeSelectedData.some((data: any) => {
      console.log("i am id ,",data.contact[0]?.id)
      return data.orgId == id && data.contact[0]?.id== contactID;
    });
  }

  deleteMultipleData() {
    console.log('delete data list before', this.storeSelectedData);

    this.storeSelectedData.forEach((storedata: any) => {
      const filter = this.showtableData.filter((data: any) => {
        return data.id === storedata.orgId;
      });
      console.log('filter', filter[0].contact);
      const id = filter[0].contact.findIndex((data: any) => {
        return data.id == storedata.contact.id;
      });
      console.log('Id', id);
      filter[0].contact.splice(id, 1);
    });
    this.storeSelectedData = [];
    this.checkBoxDisableBtn = true;
    console.log('delete data list after', this.storeSelectedData);
  }

  editSelectedData() {
    console.log(this.storeSelectedData);
    const checkLength = this.storeSelectedData.length;
    if (checkLength) {
      let orgId = this.storeSelectedData[0]?.orgId;
      let contactId = this.storeSelectedData[0]?.contact.id;
      console.log(orgId, contactId);
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
