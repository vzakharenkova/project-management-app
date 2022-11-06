import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { DescriptionPageComponent } from './pages/description-page/description-page.component';
import { TeamPageComponent } from './pages/team-page/team-page.component';
import { TeamCardComponent } from './components/team-card/team-card.component';
import { TitlePageComponent } from './pages/title-page/title-page.component';
import { StartScreenLayoutComponent } from './start-screen-layout.component';

@NgModule({
  declarations: [
    DescriptionPageComponent,
    TeamPageComponent,
    TeamCardComponent,
    TitlePageComponent,
    StartScreenLayoutComponent,
  ],
  imports: [SharedModule],
  exports: [
    DescriptionPageComponent,
    TeamPageComponent,
    TeamCardComponent,
    TitlePageComponent,
    StartScreenLayoutComponent,
  ],
})
export class StartScreenModule {}
