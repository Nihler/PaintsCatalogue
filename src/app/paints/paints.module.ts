import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material.module';

import { PaintsFormComponent } from './paints-form/paints-form.component';
import { PaintsListComponent } from './paints-list/paints-list.component';

@NgModule({
  declarations: [PaintsListComponent, PaintsFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
  ],
})
export class PaintsModule {}
