import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { SingleBoardPageComponent } from './single-board-page/single-board-page.component';
import { BoardColumnComponent } from './single-board-page/components/board-column/board-column.component';
import { TaskCardComponent } from './single-board-page/components/task-card/task-card.component';
import { BoardsPageComponent } from './board-list-page/boards-page.component';
import { BoardCardComponent } from './board-list-page/components/board-card/board-card.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { WorkspaceComponent } from './workspace.component';
import { EditProfilePageComponent } from './edit-profile-page/edit-profile-page.component';
import { CreateBoardComponent } from './create-board/create-board.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { CreateColumnComponent } from './single-board-page/components/create-column/create-column.component';
import { TaskModalComponent } from './single-board-page/components/task-card/components/task-modal/task-modal.component';
import { TaskPriorityDirective } from './single-board-page/components/task-card/directives/task-priority.directive';

const routes: Routes = [
  {
    path: 'boards',
    component: WorkspaceComponent,
    children: [
      { path: '', component: BoardsPageComponent },
      { path: ':id', component: SingleBoardPageComponent },
    ],
    canActivate: [AuthGuard],
  },
  { path: 'edit', component: EditProfilePageComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    WorkspaceComponent,
    SingleBoardPageComponent,
    BoardsPageComponent,
    BoardColumnComponent,
    BoardCardComponent,
    TaskCardComponent,
    TaskFormComponent,
    EditProfilePageComponent,
    CreateBoardComponent,
    CreateColumnComponent,
    TaskModalComponent,
    TaskPriorityDirective,
  ],
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [
    RouterModule,
    SingleBoardPageComponent,
    BoardsPageComponent,
    BoardColumnComponent,
    BoardCardComponent,
    TaskCardComponent,
    TaskFormComponent,
    EditProfilePageComponent,
    CreateBoardComponent,
    CreateColumnComponent,
    TaskModalComponent,
  ],
})
export class WorkspaceModule {}
