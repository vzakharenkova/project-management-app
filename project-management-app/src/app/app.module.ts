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

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    TitleComponent,
    TeamComponent,
    TeamCardComponent,
    DescriptionComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
