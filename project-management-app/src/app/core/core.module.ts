import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { StartScreenModule } from '../start-screen/start-screen.module';
import { WorkspaceModule } from '../workspace/workspace.module';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    SharedModule,
    StartScreenModule,
    WorkspaceModule,
  ],
  exports: [StoreModule, StartScreenModule, WorkspaceModule],
})
export class CoreModule {}
