import { TeamModalComponent } from './../../shared/team-modal/team-modal.component';
import { ReadRequests } from './../../models/read-models/read-requests';
import { WriteRequests } from './../../models/write-models/write-requests';
import { DeleteModalComponent } from './../../shared/delete-modal/delete-modal.component';
import { TokenStorageService } from './../../services/token-storage-service/token-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReadUser } from './../../models/read-models/read-users';
import { HttpService } from './../../services/http-service/http.service';
import { ReadDetails } from './../../models/read-models/read-details';
import { ReadProject } from './../../models/read-models/read-project';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  isJoined: boolean;
  willing: number[];
  willingNames: string[] = [];
  userWilling: ReadUser[] = [];
  requestWilling: ReadRequests[] = [];

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private modalService: NgbModal,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isJoined = false;
    const projectId = this.route.snapshot.params['id'];
    this.validIsJoined(projectId);
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
        this.httpService
          .patch(`projects/${this.project.id}`, {
            name: result['name'],
            technologies: result['technologies'],
          })
          .subscribe(
            () => {
              this.project.name = result['name'];
              this.project.technologies = result['technologies'];
            },
            () => {}
          );
        this.httpService
          .patch(`details/${this.details.id}`, {
            description: result['description'],
            startDate: result['startDate'],
          })
          .subscribe(
            () => {
              this.details.description = result['description'];
              this.details.startDate = result['startDate'];
            },
            () => {}
          );
      },
      () => {}
    );
  }

  isCurrentUserOwner() {
    return this.tokenStorageService.getUser().id === this.project.owner_id;
  }

  deleteProject() {
    const modalDel = this.modalService.open(DeleteModalComponent);
    modalDel.componentInstance.lbl = this.project.name;
    modalDel.result.then(
      () => {
        this.httpService.deleteById('details', this.details.id).subscribe(
          () => {
            this.httpService.getById('requests', this.project.id).subscribe(
              (data: ReadRequests[]) => {
                if (data) {
                  for (const rq of data) {
                    this.httpService.deleteById('requests', rq['id']).subscribe(
                      () => {},
                      () => {}
                    );
                  }
                }
              },
              () => {}
            );
            this.httpService.deleteById('projects', this.project.id).subscribe(
              () => {
                console.log('Proiectul a fost sters');
                this.router.navigate(['/board/myProjects']);
              },
              () => {}
            );
          },
          () => {}
        );
      },
      () => {}
    );
  }

  validIsJoined(projectId) {
    this.httpService.getById('requests', projectId).subscribe(
      (data: ReadRequests[]) => {
        for (const entry of data) {
          if (entry['userId'] === this.tokenStorageService.getUser().id) {
            this.isJoined = true;
          }
        }
      },
      () => {}
    );
  }

  createRequest() {
    if (this.isJoined === false) {
      const writeRequest: WriteRequests = {
        projectId: this.project.id,
        userId: this.tokenStorageService.getUser().id,
      };
      this.httpService.post('requests', writeRequest).subscribe(
        () => {
          this.router.navigate(['/board/find']);
        },
        () => {}
      );
    } else {
      console.log('already joined');
    }
  }

  showJoinButton() {
    return this.isJoined;
  }

  showWilling() {
    this.willingNames = [];
    this.httpService.getById('requests', this.project.id).subscribe(
      (data: ReadRequests[]) => {
        this.requestWilling = data;
        for (const entry of data) {
          this.httpService.getById('users', entry['userId']).subscribe(
            (user: ReadUser) => {
              this.willingNames.push(user['username']);
              this.userWilling.push(user);
            },
            () => {}
          );
        }
      },
      () => {}
    );
    if (this.willingNames != null) {
      const modalTeam = this.modalService.open(TeamModalComponent);
      modalTeam.componentInstance.team = this.willingNames;
      modalTeam.componentInstance.avaiblePositions =
        this.details.noMembers - this.team.length;
      modalTeam.result.then(
        (data) => {
          let userId = -1;
          if (data !== null) {
            for (const userW of this.userWilling) {
              userId = -1;
              for (const accept of data['accept']) {
                if (accept === userW['username']) {
                  this.willingNames.filter((m) => m !== accept);
                  userId = userW['id'];
                  this.team.push(userW);
                  this.httpService
                    .patch(`projects/${this.project.id}`, {
                      users_ids: [userId],
                    })
                    .subscribe(
                      () => {},
                      () => {}
                    );
                }
              }
              for (const remove of data['remove']) {
                if (remove === userW['username']) {
                  userId = userW['id'];
                  this.willingNames.filter((m) => m !== remove);
                }
              }
              if (userId !== -1) {
                for (const rq of this.requestWilling) {
                  if (rq['userId'] === userId) {
                    this.httpService.deleteById('requests', rq['id']).subscribe(
                      () => {},
                      () => {}
                    );
                  }
                }
              }
            }
          }
          this.router.navigate(['/board/myProjects']);
        },
        () => {
          this.willingNames = [];
          this.router.navigate(['/board/myProjects']);
        }
      );
    }
  }
}
