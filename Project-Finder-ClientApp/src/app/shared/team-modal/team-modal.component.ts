import { ReadRequests } from './../../models/read-models/read-requests';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';
import { stringify } from 'querystring';

@Component({
  selector: 'app-team-modal',
  templateUrl: './team-modal.component.html',
  styleUrls: ['./team-modal.component.scss'],
})
export class TeamModalComponent implements OnInit {
  message: string;
  acceptUsers: string[] = [];
  removeUsers: string[] = [];
  @Input() team: string[];
  @Input() avaiblePositions: number;

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.message = '';
    this.initMessage();
  }

  close() {
    this.activeModal.close({
      accept: this.acceptUsers,
      remove: this.removeUsers,
    });
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  addAcceptUser(user) {
    if (this.avaiblePositions > 0) {
      this.avaiblePositions--;
      this.acceptUsers.push(user);
      this.team = this.team.filter((obj) => obj !== user);
      this.message = `${user} is added to the team`;
    } else {
      this.message = 'Team is full!';
    }
  }

  addRemoveUser(user) {
    this.removeUsers.push(user);
    this.team = this.team.filter((obj) => obj !== user);
  }

  initMessage() {
    if (this.avaiblePositions < 1) {
      this.message = 'Team is full!';
    }
  }
}
