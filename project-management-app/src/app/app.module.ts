import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { TitleComponent } from './welcome-page/components/title/title.component';
import { TeamComponent } from './welcome-page/components/team/team.component';
import { TeamCardComponent } from './welcome-page/components/team-card/team-card.component';
import { DescriptionComponent } from './welcome-page/components/description/description.component';
import { BoardsPageComponent } from './boards-page/boards-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BoardCardComponent } from './boards-page/components/board-card/board-card.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    TitleComponent,
    TeamComponent,
    TeamCardComponent,
    DescriptionComponent,
    BoardsPageComponent,
    HeaderComponent,
    FooterComponent,
    BoardCardComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
