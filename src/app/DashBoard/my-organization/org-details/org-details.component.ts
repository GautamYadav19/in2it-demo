import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrgService } from '../service/org.service';

@Component({
  selector: 'app-org-details',
  templateUrl: './org-details.component.html',
  styleUrls: ['./org-details.component.css'],
})
export class OrgDetailsComponent implements OnInit {
  orgDetailsdata: any;
  active = 1;
  addTaskFlag: boolean = false;
  rightCardData:any;
// yaha abhii static data la rahe hain table ka liya 
tableData:any=[]
  constructor(private orgService: OrgService) {}
  ngOnInit(): void {
    this.getOrgByID();
    this.getContactData()
  }
  togglebtn() {
    this.addTaskFlag = !this.addTaskFlag;
  }
getContactData(){
  const data=this.orgService.getAllList()
  console.log(data)
  // this.tableData=
}
  getOrgByID() {
    this.orgService.getOrgIdSub.subscribe((res) => {
      this.orgDetailsdata = this.orgService.getOrgByID(res);
      console.log(this.orgDetailsdata?.email);
    });
  }
  getOrgMemberDataById(id: number) {
    this.togglebtn()
    const data= this.tableData.filter((res: any) => {
      return res.id === id;
    });
    this.rightCardData=data[0]
    console.log(this.rightCardData)
  }
}
