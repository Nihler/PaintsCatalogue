import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaintsListComponent } from '../paints/paints-list/paints-list.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { AuthorizationGuard } from '../auth/authorization.guard';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: ':userId',
        canActivate: [AuthorizationGuard],
        component: ProfileInfoComponent,
      },
      { path: 'inventory/:userId', component: PaintsListComponent },
      { path: 'wishlist/:userId', component: PaintsListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRouterModule {}
