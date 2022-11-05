import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsPageComponent } from './boards-page/boards-page.component';
import { SingleBoardPageComponent } from './single-board-page/single-board-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
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
