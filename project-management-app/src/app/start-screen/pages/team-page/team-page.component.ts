import { Component } from '@angular/core';
import { MemberModel } from '../../models/team-members.model';

@Component({
  selector: 'app-team',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss'],
})
export class TeamPageComponent {
  public teamMembers: MemberModel[] = [
    {
      name: 'Pavel Kizhlo',
      img: 'https://avatars.githubusercontent.com/u/94741768?v=4',
      contribution: 'AAAAAA',
    },
    {
      name: 'Victoria Zakharenkova',
      img: 'https://avatars.githubusercontent.com/u/94629690?v=4',
      contribution: 'AAAAAA',
    },
    {
      name: 'Nick Davydov',
      img: 'https://avatars.githubusercontent.com/u/101674084?v=4',
      contribution: 'AAAAAA',
    },
  ];
}
