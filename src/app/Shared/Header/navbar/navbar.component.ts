import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { DataService } from 'src/app/DashBoard/my-menu/service/data.service';
import { NavTitle } from '../../Interfaces/interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  title!: NavTitle;
  flag: boolean = true;
  constructor(private service: DataService) {}

  ngOnInit() {
    this.getTabTitle();
  }
  getTabTitle() {
    this.service.tabNavigateName.subscribe((res) => {
      this.title = res;
    });
  }
  toggle() {
    console.log(this.flag);
    this.flag = !this.flag;
  }
  setTableTitle(name: NavTitle) {
    this.service.setTabnavigateName(name);
  }
}
