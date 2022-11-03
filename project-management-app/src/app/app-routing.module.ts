import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomPageComponent } from './welcom-page/welcom-page.component';

const routes: Routes = [{ path: 'welcom', component: WelcomPageComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
