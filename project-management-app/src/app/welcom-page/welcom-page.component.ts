import { Component } from '@angular/core';

@Component({
  selector: 'app-welcom-page',
  templateUrl: './welcom-page.component.html',
  styleUrls: ['./welcom-page.component.scss'],
})
export class WelcomPageComponent {
  private page = 1;

  public changePage(newPage: number) {
    this.page = newPage;
  }

  public displayPage(pageNumber: number) {
    return this.page === pageNumber ? { display: 'block' } : { display: 'none' };
  }
}
