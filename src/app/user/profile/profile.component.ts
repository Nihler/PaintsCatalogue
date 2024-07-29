import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  RoutesRecognized,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  username: string;
  usernameSub: Subscription;
  isAuthorized = false;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usernameSub = this.authService
      .getUsernameListener()
      .subscribe((val) => {
        this.route.url.subscribe((url) => {
          if (this.route.snapshot.firstChild.params['userId']) {
            this.username = this.route.snapshot.firstChild.params['userId'];
          } else {
            this.username = val;
          }
          if (this.route.snapshot.firstChild.params['userId'] === val) {
            this.isAuthorized = true;
          }
        });
      });
  }

  ngOnDestroy(): void {
    this.usernameSub.unsubscribe();
  }
}
