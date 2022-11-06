import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { StartScreenModule } from '../start-screen/start-screen.module';
import { WorkspaceModule } from '../workspace/workspace.module';

@NgModule({
  declarations: [],
  imports: [SharedModule, StartScreenModule, WorkspaceModule],
  exports: [StartScreenModule, WorkspaceModule],
})
export class CoreModule {}
