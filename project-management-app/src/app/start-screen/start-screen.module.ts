import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { DescriptionPageComponent } from './pages/description-page/description-page.component';
import { TeamPageComponent } from './pages/team-page/team-page.component';
import { TeamCardComponent } from './components/team-card/team-card.component';
import { TitlePageComponent } from './pages/title-page/title-page.component';
import { StartScreenLayoutComponent } from './start-screen-layout.component';
import { UnauthGuard } from '../core/guards/unauth.guard';
import { TranslocoModule } from '@ngneat/transloco';

const routes: Routes = [
  {
    path: 'welcome',
    component: StartScreenLayoutComponent,
    children: [
      { path: '', component: TitlePageComponent },
      { path: 'team', component: TeamPageComponent },
      { path: 'description', component: DescriptionPageComponent },
    ],
    canActivate: [UnauthGuard],
  },
];

@NgModule({
  declarations: [
    DescriptionPageComponent,
    TeamPageComponent,
    TeamCardComponent,
    TitlePageComponent,
    StartScreenLayoutComponent,
  ],
  imports: [SharedModule, TranslocoModule, RouterModule.forChild(routes)],
  exports: [
    RouterModule,
    DescriptionPageComponent,
    TeamPageComponent,
    TeamCardComponent,
    TitlePageComponent,
    StartScreenLayoutComponent,
  ],
})
export class StartScreenModule {}
