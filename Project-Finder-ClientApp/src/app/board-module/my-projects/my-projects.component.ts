import { WriteDetails } from './../../models/write-models/write-details';
import { WriteProject } from './../../models/write-models/write-project';
import { AddModalComponent } from './../../shared/add-modal/add-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Page } from './../../models/page';
import { HttpService } from './../../services/http-service/http.service';
import { ReadProject } from './../../models/read-models/read-project';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TokenStorageService } from 'src/app/services/token-storage-service/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss'],
})
export class MyProjectsComponent implements OnInit, OnDestroy {
  projects: ReadProject[];
  currentPage: Page;
  pageSize = 12;
  noRows = 3;
  subscription: Subscription;

  constructor(
    private httpService: HttpService,
    private tokenStorageService: TokenStorageService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPage(0, this.pageSize);
  }

  ngOnDestroy(): void {
    this.closeSubscription();
  }

  getPage(pageNumber: number, pageSize: number): void {
    this.closeSubscription();
    this.subscription = this.httpService
      .getAll<any>(
        `projects/myprojects/${
          this.tokenStorageService.getUser().id
        }?page=${pageNumber}&size=${pageSize}`
      )
      .subscribe((data) => {
        this.projects = data['content'];
        this.currentPage = {
          totalPages: data['totalPages'],
          number: data['number'],
          last: data['last'],
          first: data['first'],
          size: data['size'],
          numberOfElements: data['numberOfElements'],
        };
      });
  }

  getPreviousPage(): void {
    this.getPage(this.currentPage.number - 1, this.pageSize);
  }

  getNextPage(): void {
    this.getPage(this.currentPage.number + 1, this.pageSize);
  }

  closeSubscription(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  createProject(): void {
    const modalRef = this.modalService.open(AddModalComponent);
    modalRef.result.then(
      (result: any) => {
        const writeProject: WriteProject = {
          name: result['name'],
          technologies: result['technologies'],
          isAvailable: true,
          users_ids: [this.tokenStorageService.getUser().id],
          owner_id: this.tokenStorageService.getUser().id,
        };
        this.httpService.post('projects', writeProject).subscribe(
          (idProject: number) => {
            const writeDetails: WriteDetails = {
              noMembers: result['noMembers'],
              description: result['description'],
              startDate: result['startDate'],
              project_id: idProject,
            };
            this.httpService.post('details', writeDetails).subscribe();
            const readProject: ReadProject = {
              id: idProject,
              name: result['name'],
              technologies: result['technologies'],
              isAvailable: true,
              users_ids: [this.tokenStorageService.getUser().id],
              owner_id: this.tokenStorageService.getUser().id,
            };
            this.projects.push(readProject);
          },
          () => {}
        );
      },
      () => {}
    );
  }

  redirectToDetailsView(id: number) {
    this.router.navigate(['/board/project', id]);
  }
}
