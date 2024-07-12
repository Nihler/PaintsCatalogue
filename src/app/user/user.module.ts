import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserRouterModule } from './user-routing.module';
import { PaintsModule } from '../paints/paints.module';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [ProfileComponent, ProfileInfoComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    UserRouterModule,
    PaintsModule,
  ],
})
export class UserModule {}
