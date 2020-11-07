import { Page } from './../../models/page';
import { ReadUser } from './../../models/read-models/read-users';
import { HttpService } from './../../services/http-service/http.service';
import { ReadProject } from './../../models/read-models/read-project';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TokenStorageService } from 'src/app/services/token-storage-service/token-storage.service';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss']
})
export class MyProjectsComponent implements OnInit,OnDestroy {

  projects: ReadProject[];
  user: ReadUser;
  currentPage: Page;
  pageSize = 12;
  noRows = 3;
  subscription: Subscription;

  constructor(private httpService: HttpService, private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.getPage(0, this.pageSize);
  }

  ngOnDestroy(): void {
    this.closeSubscription();
  }

  getPage(pageNumber: number, pageSize: number): void {
    this.closeSubscription();

    this.subscription = this.httpService
      .getAll<any>(`projects/myprojects/${this.tokenStorageService.getUser().id}?page=${pageNumber}&size=${pageSize}`)
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

}
