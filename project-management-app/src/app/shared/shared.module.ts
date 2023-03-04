import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { TranslocoModule } from '@ngneat/transloco';
import { LangTogglerComponent } from './components/lang-toggler/lang-toggler.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { CutPipe } from './pipes/cut.pipe';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ConfirmationModalComponent,
    SidenavComponent,
    LangTogglerComponent,
    CutPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslocoModule,
  ],
  exports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FooterComponent,
    HeaderComponent,
    ConfirmationModalComponent,
    LangTogglerComponent,
    SidenavComponent,
    CutPipe,
  ],
})
export class SharedModule {}
