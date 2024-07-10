import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrgService } from '../service/org.service';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-org-details',
  templateUrl: './org-details.component.html',
  styleUrls: ['./org-details.component.css'],
})
export class OrgDetailsComponent implements OnInit {
  orgDetailsdata: any;
  active = 1;
  addTaskFlag: boolean = false;
  rightCardData: any;
  rowData: any;
  columnDef: ColDef[]=[
    {headerName:'ID',field:'id' },
    {headerName:'Name',field:'name' },
    {headerName:'Email',field:'email' },
    {headerName:'Role',field:'role' },
    {headerName:'Additional Role',field:'additionalrole' },
    {headerName:'Phone Number',field:'phoneNumber' },
   
    
    

  ];
  // yaha abhii static data la rahe hain table ka liya
  tableData: any = [];
  constructor(private orgService: OrgService) {}
  ngOnInit(): void {
    this.getOrgByID();
    this.getContactData();
  }
  togglebtn() {
    this.addTaskFlag = !this.addTaskFlag;
  }

  getContactData() {
  this.orgService.getAllList();
  }
  
  getOrgByID() {
    this.orgService.getOrgIdSub.subscribe((res) => {
      this.orgDetailsdata = this.orgService.getOrgByID(res);
      this.rowData =this.orgDetailsdata.contact
    });
  }

  getOrgMemberDataById(id: number) {
    this.togglebtn();
    const data = this.tableData.filter((res: any) => {
      return res.id === id;
    });
    this.rightCardData = data[0];
  }
}
