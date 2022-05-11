import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationCreateComponent } from './components/registration-create/registration-create.component';
import { RegistrationsListComponent } from './components/registrations-list/registrations-list.component';

const routes: Routes = [
  {path: 'registrations-list', component: RegistrationsListComponent},
  {path: 'registration-create', component: RegistrationCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
