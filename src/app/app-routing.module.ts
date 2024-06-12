import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaintsListComponent } from './paints/paints-list/paints-list.component';
import { PaintsFormComponent } from './paints/paints-form/paints-form.component';

const routes: Routes = [
  {
    path: '',
    component: PaintsListComponent,
  },
  { path: 'addPaint', component: PaintsFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
