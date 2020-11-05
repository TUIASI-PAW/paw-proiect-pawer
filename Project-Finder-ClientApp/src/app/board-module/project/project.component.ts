import { ReadUser } from './../../models/read-models/read-users';
import { HttpService } from './../../services/http-service/http.service';
import { ReadProject } from './../../models/read-models/read-project';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  @Input() project: ReadProject;
  user: ReadUser;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    if (this.project) {
      this.httpService
        .getById<ReadUser>('users', this.project.owner_id)
        .subscribe((data) => {
          this.user = data;
        });
    }
  }
}
