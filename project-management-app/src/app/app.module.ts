import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { TitleComponent } from './welcome-page/components/title/title.component';
import { TeamComponent } from './welcome-page/components/team/team.component';
import { TeamCardComponent } from './welcome-page/components/team-card/team-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DescriptionComponent } from './welcome-page/components/description/description.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    TitleComponent,
    TeamComponent,
    TeamCardComponent,
    DescriptionComponent,
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
