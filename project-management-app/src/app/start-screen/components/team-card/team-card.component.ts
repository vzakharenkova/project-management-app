import { Component, Input, OnInit } from '@angular/core';
import { MemberModel } from '../../models/team-members.model';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss'],
})
export class TeamCardComponent implements OnInit {
  @Input() member: MemberModel;

  @Input() index: number;

  public translationField: string;

  ngOnInit() {
    this.translationField = `welcome.teamPage.team.${this.index}`;
  }
}
