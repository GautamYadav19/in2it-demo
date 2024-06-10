import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrgService } from '../../service/org.service';
import { DataService } from 'src/app/DashBoard/my-menu/service/data.service';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-miniheader',
  templateUrl: './miniheader.component.html',
  styleUrls: ['./miniheader.component.css'],
})
export class MiniheaderComponent implements OnInit, OnDestroy {
  
  navs = [
    {
      id: 0,
      organization: 'Organization',
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
  organizations: any = [];
  counter = this.navs.length + 1;
  active!: number;
  showTable!: any;
  flag!: boolean;
  rowData!: any;
  columnDefs!: ColDef[];
  ngOnInit(): void {
    this.getListOfTable();
    this.getAllTable();
    const existingData = JSON.parse(localStorage.getItem('orgData')!);
    existingData?.forEach((element: any) => {
      this.navs.push(element);
    });

    const navigation = history.state;
    console.log('org', navigation?.data);
    if (navigation.data && navigation.id) {
      this.add(navigation, navigation.data);
    }
  }

  constructor(
    private orgService: OrgService,
    private dataService: DataService
  ) {
    this.setnavTitle();
  }

  setnavTitle() {
    this.dataService.setTabnavigateName({
      name: 'details',
      modalName: 'Organization',
    });
  }
  ngOnDestroy(): void {
    localStorage.removeItem('orgData');
  }

  close(event: MouseEvent, toRemove: number, id: any) {
    this.navs.splice(toRemove, 1);
    this.active = 0;
    const existingData = JSON.parse(localStorage.getItem('orgData')!);
    const data = existingData.filter((data: any) => {
      return data.id !== id;
    });
    console.log('dsfsd', data);
    localStorage.setItem('orgData', JSON.stringify(data));
    event.preventDefault();
    event.stopImmediatePropagation();
  }
  checkExisitingTab(id: number) {
    this.flag = false;
    this.navs.some((data) => {
      if (data.id === id) {
        this.flag = true;
        return true;
      }
      return false;
    });
  }
  onTabClick(id: any) {
    if (id !== 0) {
      this.active = id;
      this.orgService.SetOrgId(id);
    }
  }
  add(event: MouseEvent, org: any) {
    this.checkExisitingTab(org?.id);
    this.active = org.id;
    if (!this.flag) {
      this.navs.push(org);
      this.orgService.SetOrgId(org.id);
      const existingData = JSON.parse(localStorage.getItem('orgData')!) || [];
      existingData.push(org);
      localStorage.setItem('orgData', JSON.stringify(existingData));

      // event.preventDefault();
    } else {
      this.orgService.SetOrgId(org.id);
    }
  }

  filterData(filterName: any) {
    const filteredOrganizations = this.organizations.filter(
      (data: any) => data.type === filterName
    );
    this.rowData = filteredOrganizations;
  }

  getAllTable() {
    this.showTable = this.organizations;
    this.rowData = this.showTable;
    console.log(this.showTable);
    const columnnames = [];
    const tableFields = [
      'id',
      'organization',
      'type',
      'industry',
      'onboarding',
      'relatedOrgs',
      'products',
      'orgSPOC',
      'email',
      'phone',
    ];
    for (let i = 0; i < tableFields.length; i++) {
      if (tableFields[i] === 'id') {
        const data = {
          field: tableFields[i],
          hide: true,
        };
        columnnames.push(data);
      } else if (tableFields[i] === 'email') {
        const data = {
          field: tableFields[i],
          width: 200,
        };
        columnnames.push(data);
      } else if (tableFields[i] === 'organization') {
        const data = {
          field: tableFields[i],
          width: 130,

        };
        columnnames.push(data);
      } else {
        const data = {
          field: tableFields[i],
          width: 130,
        };
        columnnames.push(data);
      }
    }
    this.columnDefs = columnnames;
  }
  getListOfTable() {
    this.organizations = this.orgService.getAllList();
    console.log(this.organizations, 'sdfsdfsd');
  }

  searOrgList(value: string) {
    if (!value) {
      this.rowData = this.organizations;
    } else {
      const filteredOrganizations = this.organizations.filter((org: any) => {
        const orgValues = Object.values(org);
        return orgValues.some(
          (field) =>
            typeof field === 'string' &&
            field.toLowerCase().includes(value.toLowerCase())
        );
      });
      this.rowData = filteredOrganizations;
    }
  }
}
