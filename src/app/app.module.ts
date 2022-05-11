import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationCreateComponent } from './components/registration-create/registration-create.component';
import { RegistrationEditComponent } from './components/registration-edit/registration-edit.component';
import { RegistrationsListComponent } from './components/registrations-list/registrations-list.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationCreateComponent,
    RegistrationEditComponent,
    RegistrationsListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      { path: 'registrations-list', component: RegistrationsListComponent },
      { path: 'registration-create', component: RegistrationCreateComponent },
      { path: '', redirectTo: '/registration-create', pathMatch: 'full' },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
