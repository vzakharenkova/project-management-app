import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsPageComponent } from './boards-page/boards-page.component';
import { WelcomPageComponent } from './welcom-page/welcom-page.component';

const routes: Routes = [
  { path: 'welcom', component: WelcomPageComponent },
  { path: 'boards', component: BoardsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
