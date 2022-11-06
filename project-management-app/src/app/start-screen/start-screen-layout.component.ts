import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './start-screen-layout.component.html',
  styleUrls: ['./start-screen-layout.component.scss'],
})
export class StartScreenLayoutComponent {
  private page = 1;

  public changePage(newPage: number) {
    this.page = newPage;
  }

  public displayPage(pageNumber: number) {
    return this.page === pageNumber ? { display: 'block' } : { display: 'none' };
  }
}
