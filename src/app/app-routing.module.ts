import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaintsListComponent } from './paints/paints-list/paints-list.component';
import { PaintsFormComponent } from './paints/paints-form/paints-form.component';
import { ProfileComponent } from './user/profile/profile.component';
import { InventoryComponent } from './user/inventory/inventory.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PaintsListComponent,
  },
  { path: 'addPaint', component: PaintsFormComponent },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  { path: 'user', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'user/inventory/:userId', component: PaintsListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
