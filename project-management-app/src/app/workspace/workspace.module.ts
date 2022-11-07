import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { SingleBoardPageComponent } from './single-board-page/single-board-page.component';
import { BoardColumnComponent } from './single-board-page/components/board-column/board-column.component';
import { TaskCardComponent } from './single-board-page/components/task-card/task-card.component';
import { TaskPriorityDirective } from './single-board-page/directives/task-priority.directive';
import { BoardsPageComponent } from './board-list-page/boards-page.component';
import { BoardCardComponent } from './board-list-page/components/board-card/board-card.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { WorkspaceComponent } from './workspace.component';
import { MatSelectModule } from '@angular/material/select';

const routes: Routes = [
  {
    path: 'boards',
    component: WorkspaceComponent,
    children: [
      { path: '', component: BoardsPageComponent },
      { path: ':title', component: SingleBoardPageComponent },
    ],
  },
];

@NgModule({
  declarations: [
    WorkspaceComponent,
    SingleBoardPageComponent,
    BoardsPageComponent,
    BoardColumnComponent,
    BoardCardComponent,
    TaskCardComponent,
    TaskPriorityDirective,
    TaskFormComponent,
  ],
    imports: [SharedModule, RouterModule.forChild(routes), MatSelectModule],
  exports: [
    RouterModule,
    SingleBoardPageComponent,
    BoardsPageComponent,
    BoardColumnComponent,
    BoardCardComponent,
    TaskCardComponent,
    TaskPriorityDirective,
    TaskFormComponent,
  ],
})
export class WorkspaceModule {}
