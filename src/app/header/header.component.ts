import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authListenerSubs: Subscription;
  isLoggedIn = false;
  username: string;
  usernameInput: FormControl;
  layoutChanges: Subscription;
  smallScreen = false;
  @Output() sidenavButtonEmiter: EventEmitter<boolean>;

  constructor(
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.usernameInput = new FormControl(null, {
      validators: [Validators.required, Validators.minLength(3)],
    });

    this.isLoggedIn = this.authService.getIsAuth();
    this.username = this.authService.getUserName();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
      });
    this.layoutChanges = this.breakpointObserver
      .observe(['(max-width: 630px)'])
      .subscribe((res) => {
        console.log(res);
        console.log(res.matches);
        console.log(res.breakpoints);
        this.smallScreen = res.matches;
      });
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
    this.layoutChanges.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  toggleSidenav() {
    this.commonService.sidenavToggle(false);
  }
}
