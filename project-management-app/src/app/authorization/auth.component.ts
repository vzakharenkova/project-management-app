import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BREAKPOINTS } from '../shared/constants/constants';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthPageComponent implements OnInit {
  public isMediumScreen: boolean;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver.observe(BREAKPOINTS.medium).subscribe((res) => {
      this.isMediumScreen = res.breakpoints[BREAKPOINTS.medium];
    });
  }
}
