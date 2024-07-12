import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaintsListComponent } from '../paints/paints-list/paints-list.component';
import { UserRouterModule } from './user-routing.module';
import { PaintsModule } from '../paints/paints.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    UserRouterModule,
    PaintsModule,
  ],
})
export class UserModule {}
