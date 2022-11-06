import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isScrolled: boolean;

  ngOnInit() {
    this.animateHeader();
  }

  animateHeader() {
    window.onscroll = () => {
      if (window.pageYOffset > 0) {
        this.isScrolled = true;
      } else {
        this.isScrolled = false;
      }
    };
  }
}
