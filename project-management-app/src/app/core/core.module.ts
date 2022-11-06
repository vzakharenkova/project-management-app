import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { StartScreenModule } from '../start-screen/start-screen.module';
import { WorkspaceModule } from '../workspace/workspace.module';
import { CommonInterceptor } from './services/common.interceptor';

const COMMON_INTERCEPTOR = { provide: HTTP_INTERCEPTORS, useClass: CommonInterceptor, multi: true };
import { EffectsModule } from '@ngrx/effects';
import { AuthModule } from '../authorization/auth.module';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    SharedModule,
    StartScreenModule,
    WorkspaceModule,
    AuthModule,
  ],
  exports: [StoreModule, StartScreenModule, WorkspaceModule],
  providers: [COMMON_INTERCEPTOR],
})
export class CoreModule {}
