import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { DataService } from 'src/app/DashBoard/my-menu/service/data.service';
import { NavTitle } from '../../Interfaces/interface';
import { AuthServiceService } from 'src/app/core/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  title!: NavTitle;
  flag: boolean = true;
  constructor(
    private service: DataService,
    private _authServcie: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getTabTitle();
  }
  getTabTitle() {
    this.service.tabNavigateName.subscribe((res) => {
      this.title = res;
    });
  }
  toggle() {
    this.flag = !this.flag;
  }
  setTableTitle(name: NavTitle) {
    this.service.setTabnavigateName(name);
  }
  logout() {
    this._authServcie.clearStorage();
    this.router.navigate(['']);
  }
}
