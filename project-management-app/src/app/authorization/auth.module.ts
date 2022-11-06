import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
    ],
  },
];

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegistrationComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule, LoginComponent, RegistrationComponent],
})
export class AuthModule {}
