import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userId: string;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserName();
    console.log(this.userId);
  }
}
