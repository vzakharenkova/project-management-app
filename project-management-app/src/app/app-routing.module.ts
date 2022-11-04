import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsPageComponent } from './boards-page/boards-page.component';
import { SingleBoardPageComponent } from './single-board-page/single-board-page.component';
import { WelcomPageComponent } from './welcom-page/welcom-page.component';

const routes: Routes = [
  { path: 'welcom', component: WelcomPageComponent },
  {
    path: 'boards',
    component: BoardsPageComponent,
  },
  { path: 'boards/:title', component: SingleBoardPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
