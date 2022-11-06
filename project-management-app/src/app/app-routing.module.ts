import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BoardsPageComponent } from './workspace/board-list-page/boards-page.component';
import { SingleBoardPageComponent } from './workspace/single-board-page/single-board-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
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
