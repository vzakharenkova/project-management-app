import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent {
  private page = 1;

  public changePage(newPage: number) {
    this.page = newPage;
  }

  public displayPage(pageNumber: number) {
    return this.page === pageNumber ? { display: 'block' } : { display: 'none' };
  }
}
