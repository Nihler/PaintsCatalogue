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
  @ViewChild('drawer') sidenav: any;

  constructor(
    private authService: AuthService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.authService.autoAuthUser();
    this.commonService.sidenavToggleStatus().subscribe((res) => {
      console.log('app component ' + res);
      this.sidenavStatus = res;
      this.sidenav.toggle();
    });
  }
}
