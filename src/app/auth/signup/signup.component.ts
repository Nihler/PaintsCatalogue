import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { confirmPasswordValidator } from 'src/app/passwordMismatchValidator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  authStatusSub: Subscription;
  signupForm: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    let emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    this.signupForm = new FormGroup(
      {
        login: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)],
        }),
        email: new FormControl(null, {
          validators: [
            Validators.required,
            Validators.minLength(5),
            Validators.pattern(emailRegEx),
          ],
        }),
        newPassword: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(4)],
        }),
        repeatPassword: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(4)],
        }),
      },
      { validators: [confirmPasswordValidator] }
    );

    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }

  onSignup(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }
    this.isLoading = true;

    this.authService.createUser(
      loginForm.value.email,
      loginForm.value.password,
      loginForm.value.username
    );
  }
}
