import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../authorization/auth.module';
import { StartScreenModule } from '../start-screen/start-screen.module';
import { WorkspaceModule } from '../workspace/workspace.module';
import { CommonInterceptor } from './services/common.interceptor';
import { AuthEffects } from './store/effects/auth.effects';
import { BoardEffects } from './store/effects/board.effects';
import { ColumnEffects } from './store/effects/column.effects';
import { TaskEffects } from './store/effects/task.effects';
import { UserEffects } from './store/effects/user.effects';
import { authReducer } from './store/reducers/auth.reducer';
import { userReducer } from './store/reducers/user.reducer';
import { boardReducer } from './store/reducers/board.reducer';
import { columnReducer } from './store/reducers/column.reducer';
import { taskReducer } from './store/reducers/task.reducer';
import { localizationReducer } from './store/reducers/localization.reducer';

const COMMON_INTERCEPTOR = { provide: HTTP_INTERCEPTORS, useClass: CommonInterceptor, multi: true };

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    StoreModule.forRoot({
      auth: authReducer,
      user: userReducer,
      board: boardReducer,
      column: columnReducer,
      task: taskReducer,
      localization: localizationReducer,
    }),
    EffectsModule.forRoot([AuthEffects, BoardEffects, ColumnEffects, TaskEffects, UserEffects]),
    SharedModule,
    StartScreenModule,
    WorkspaceModule,
    AuthModule,
  ],
  exports: [StoreModule, StartScreenModule, WorkspaceModule],
  providers: [COMMON_INTERCEPTOR],
})
export class CoreModule {}
