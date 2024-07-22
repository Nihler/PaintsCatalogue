import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { confirmPasswordValidator } from 'src/app/passwordMismatchValidator';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css'],
})
export class ProfileInfoComponent implements OnInit {
  form: FormGroup;
  private passwordMatching: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        newPassword: new FormControl(null, {
          validators: [Validators.required],
        }),
        repeatPassword: new FormControl(null, {
          validators: [Validators.required],
        }),
      },
      { validators: [confirmPasswordValidator] }
    );
  }

  changePassword() {
    this.authService.changePassword(this.form.get('newPassword').value);
  }
}
