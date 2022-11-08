import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isScrolled: boolean;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.animateHeader();
  }

  public openDialog() {
    this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: 'Create new board',
        content: 'djdjdjdjdj',
        handler: this.animateHeader.bind(HeaderComponent),
      },
    });
  }

  public animateHeader() {
    window.onscroll = () => {
      if (window.pageYOffset > 0) {
        this.isScrolled = true;
      } else {
        this.isScrolled = false;
      }
    };
  }
}
