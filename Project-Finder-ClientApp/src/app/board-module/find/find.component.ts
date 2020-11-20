import { Page } from './../../models/page';
import { ReadUser } from './../../models/read-models/read-users';
import { HttpService } from './../../services/http-service/http.service';
import { ReadProject } from './../../models/read-models/read-project';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss'],
})
export class FindComponent implements OnInit, OnDestroy {
  projects: ReadProject[];
  user: ReadUser;
  currentPage: Page;
  pageSize = 12;
  noRows = 3;
  subscription: Subscription;

  constructor(private httpService: HttpService, private router: Router) {}

  ngOnInit(): void {
    this.getPage(0, this.pageSize);
  }

  ngOnDestroy(): void {
    this.closeSubscription();
  }

  getPage(
    pageNumber: number,
    pageSize: number,
    technology: string = null
  ): void {
    this.closeSubscription();

    let reqPath: string;
    if (technology !== null) {
      reqPath = `projects/filter?page=${pageNumber}&size=${pageSize}&technology=${technology}`;
    } else {
      reqPath = `projects?page=${pageNumber}&size=${pageSize}`;
    }

    this.subscription = this.httpService
      .getAll<any>(reqPath)
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

  getFiltredProjects(filter) {
    this.getPage(0, this.pageSize, filter);
  }

  redirectToDetailsView(id: number) {
    this.router.navigate(['/board/project', id]);
  }
}
