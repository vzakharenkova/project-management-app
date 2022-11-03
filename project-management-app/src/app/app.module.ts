import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomPageComponent } from './welcom-page/welcom-page.component';
import { TitleComponent } from './welcom-page/components/title/title.component';
import { TeamComponent } from './welcom-page/components/team/team.component';
import { TeamCardComponent } from './welcom-page/components/team-card/team-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DescriptionComponent } from './welcom-page/components/description/description.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BoardsPageComponent } from './boards-page/boards-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BoardCardComponent } from './boards-page/components/board-card/board-card.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomPageComponent,
    TitleComponent,
    TeamComponent,
    TeamCardComponent,
    DescriptionComponent,
    BoardsPageComponent,
    HeaderComponent,
    FooterComponent,
    BoardCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
