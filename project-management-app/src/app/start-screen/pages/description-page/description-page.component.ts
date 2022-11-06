import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-description',
  templateUrl: './description-page.component.html',
  styleUrls: ['./description-page.component.scss'],
})
export class DescriptionPageComponent {
  constructor(private router: Router) {}

  public navigate(url: string) {
    this.router.navigateByUrl(url);
  }
}
