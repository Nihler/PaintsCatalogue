import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaintsListComponent } from './paints/paints-list/paints-list.component';
import { PaintsFormComponent } from './paints/paints-form/paints-form.component';

@NgModule({
  declarations: [AppComponent, PaintsListComponent, PaintsFormComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
