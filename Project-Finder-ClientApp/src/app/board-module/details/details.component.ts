import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReadUser } from './../../models/read-models/read-users';
import { HttpService } from './../../services/http-service/http.service';
import { ReadDetails } from './../../models/read-models/read-details';
import { ReadProject } from './../../models/read-models/read-project';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditModalComponent } from 'src/app/shared/edit-modal/edit-modal.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  project: ReadProject;
  details: ReadDetails;
  team: ReadUser[] = [];

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.params['id'];
    this.httpService.getById('projects', projectId).subscribe(
      (data: ReadProject) => {
        this.project = data;
        this.project.users_ids.map((userId) =>
          this.httpService
            .getById<ReadUser>('users', userId)
            .subscribe((user) => {
              this.team.push(user);
            })
        );
      },
      () => {}
    );
    this.httpService.getById('details', projectId).subscribe(
      (data: ReadDetails) => {
        this.details = data;
      },
      () => {}
    );
  }

  getOwnerName() {
    if (this.team && this.project) {
      const owner: ReadUser = this.team.find(
        (u) => u.id === this.project.owner_id
      );
      if (owner) {
        return owner.username;
      }
    }
  }

  getTeam() {
    if (this.team && this.project) {
      let names = '';
      this.team
        .filter((u) => u.id !== this.project.owner_id)
        .forEach((user) => (names += user.username + ' '));
      if (names.length > 0) {
        return names;
      } else {
        return 'No member joined this project yet';
      }
    }
  }

  editProject() {
    const modalRef = this.modalService.open(EditModalComponent);
    modalRef.componentInstance.titleValue = this.project.name;
    modalRef.componentInstance.technologies = this.project.technologies;
    modalRef.componentInstance.descriptionValue = this.details.description;
    modalRef.componentInstance.startDate = this.details.startDate;
    modalRef.result.then(
      (result) => {
        console.log(result);
      },
      () => {}
    );
  }
}
