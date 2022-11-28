import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private sidenav: MatDrawer;

  public setSidenav(sidenav: MatDrawer) {
    this.sidenav = sidenav;
  }

  public open() {
    this.sidenav.open();
  }

  public close() {
    this.sidenav.close();
  }

  public toggle() {
    this.sidenav.toggle();
  }

  public get isOpen() {
    return this.sidenav.opened;
  }
}
