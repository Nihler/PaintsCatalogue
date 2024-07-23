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
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usernameSub = this.authService
      .getUsernameListener()
      .subscribe((val) => {
        this.username = val;
      });

    // this.router.events.subscribe((data) => {
    //   if (data instanceof RoutesRecognized) {
    //     console.log(data.state.root);
    //   }
    // });

    // this.username = 'temp';
  }

  ngOnDestroy(): void {
    this.usernameSub.unsubscribe();
  }
}
