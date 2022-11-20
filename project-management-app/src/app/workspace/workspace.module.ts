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
import { TranslocoModule } from '@ngneat/transloco';
import { DragDirective } from './task-form/directives/dragDropFiles.directive';
import { ErrorPageComponent } from './error-page/error-page.component';

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
  { path: '**', component: ErrorPageComponent, canActivate: [AuthGuard] },
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
    DragDirective,
    ErrorPageComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(routes), TranslocoModule],
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
    ErrorPageComponent,
  ],
})
export class WorkspaceModule {}
