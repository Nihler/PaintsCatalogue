import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'PaintsCatalogue';
  sidenavStatus: boolean = false;
  isLoggedIn = false;
  username: string;
  @ViewChild('drawer') sidenav: any;

  constructor(
    private authService: AuthService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.authService.autoAuthUser();
    this.commonService.sidenavToggleStatus().subscribe((res) => {
      this.sidenavStatus = res;
      this.sidenav.toggle();
    });
    this.isLoggedIn = this.authService.getIsAuth();
    if (this.isLoggedIn) {
      this.username = this.authService.getUserName();
    }
  }

  onLogout() {
    this.authService.logout();
  }
}
