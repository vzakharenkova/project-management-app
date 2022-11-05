import { Component, Input } from '@angular/core';
import { MemberModel } from '../../models/team-members.model';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss'],
})
export class TeamCardComponent {
  @Input() member: MemberModel;
}
