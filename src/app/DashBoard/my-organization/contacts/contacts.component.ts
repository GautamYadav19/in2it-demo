import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { OrgService } from '../service/org.service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

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
  ) {}

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
    this.toggle=true
    this.openFormToggle =false
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
    // const listOfValidRoles = lisfOfRoles[0].contact.filter((data: any) => {
    //   return data.role !== restrictedValue;
    // });
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
    // listOfValidRoles.forEach((data: any) => {
    //   roleList.push(data.role);
    // });
    // const finalRoleLsit = [...new Set(roleList)];
    // this.rolesList = finalRoleLsit;
  }

  // new form
  newForm() {
    this.togglebtn();
    // this.editFormToggle();
    this.orgForm.reset();
  }

  // show table data
  getTableList() {
    this.tableData = this.showtableData = this.orgServie.getAllList();
    this.flagForOrgDropdown = false;

    this.getAllOrgdropdown();
  }
  // getFormDataById(id:any){
  //   const dataList = this.tableData.filter((field: any) => {
  //     return field?.id === field;
  //   });
  // }
  editMode:boolean=false
  initEditForm() {
    this.editMode=true
    const data = this.rightCardData;
    // yaha data algh terha se a raha hain isliya esa karna requied hain
    const fname = data?.name.split(' ')[0];
    const lname = data?.name.split(' ')[1];
    const code = data?.phoneNumber.split(' ')[0];
    const phoneNumber = data?.phoneNumber.split(' ')[1];
    // console.log('rigth', this.rightCardData.id);
    // if (this.editformToggleBtn) {
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
        // addmorefield:data.addmorefield
        remark: data?.remark,
      });
    // }
  }
  onSubmit(index?: any) {
    if (!this.editMode) {
      // Math.floor(Math.random() * (100 - 0 + 1)) + 0
      // this.showtableData.contact.push(this.orgForm.value);
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
      this.editMode=false
    }
    this.orgForm.reset();

    this.openFormToggle=this.toggle=false


  }

  // basic toggles
  togglebtn() {
    this.toggle = true;
  }
 

  cancel() {
    // this.editFormToggle();
    this.orgForm.reset();

    
    this.openFormToggle=this.toggle=false
  }
  clear() {
    this.orgForm.reset();
  }
  openFormToggleFn(edit =false) {
   
    this.toggle =  this.openFormToggle = !this.openFormToggle;
    // this.togglebtn()
    console.log("this.openFormToggle",this.openFormToggle)
    if(edit){
    this.initEditForm();

    }
  }
  // opentab(data: any, id: any) {
  //   this.router.navigate(['/organization'], { state: { data, id } });
  // }
}