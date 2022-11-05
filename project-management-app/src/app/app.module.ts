import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { TitleComponent } from './welcome-page/components/title/title.component';
import { TeamComponent } from './welcome-page/components/team/team.component';
import { TeamCardComponent } from './welcome-page/components/team-card/team-card.component';
import { DescriptionComponent } from './welcome-page/components/description/description.component';
import { BoardsPageComponent } from './boards-page/boards-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BoardCardComponent } from './boards-page/components/board-card/board-card.component';
import { SingleBoardPageComponent } from './single-board-page/single-board-page.component';
import { TaskCardComponent } from './single-board-page/components/task-card/task-card.component';
import { BoardColumnComponent } from './single-board-page/components/board-column/board-column.component';
import { TaskPriorityDirective } from './single-board-page/derectives/task-priority.directive';

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
    SingleBoardPageComponent,
    TaskCardComponent,
    BoardColumnComponent,
    TaskFormComponent,
    TaskPriorityDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
