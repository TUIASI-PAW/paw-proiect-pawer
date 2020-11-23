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
  searchPattern = '';
  isSearchedOn = false;

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
    path: string = null,
    key: string = null,
    pattern: string = null
  ): void {
    this.closeSubscription();

    let reqPath: string;
    if (path != null && pattern != null && key != null) {
      reqPath = `projects/${path}?page=${pageNumber}&size=${pageSize}&${key}=${pattern}`;
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
    this.getPage(0, this.pageSize, 'filter', 'technology', filter);
  }

  redirectToDetailsView(id: number) {
    this.router.navigate(['/board/project', id]);
  }

  searchForPattern() {
    const radioButtons = document.querySelectorAll('input[type=radio]');

    for (var i = 0; i < radioButtons.length; ++i) {
      radioButtons[i]['checked'] = false;
    }

    var pattern = this.searchPattern.toLowerCase();
    pattern = pattern.replace('c++', 'cplusplus');
    pattern = pattern.replace('c#', 'csharp');

    this.getPage(0, this.pageSize, 'search', 'pattern', pattern);
  }
}
