import { ReadProject } from './../../models/read-models/read-project';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss'],
})
export class FindComponent implements OnInit {
  projects: ReadProject[];

  constructor() {}

  ngOnInit(): void {
    this.projects = [
      {
        id: 1,
        name: 'project1',
        technologies: 'java kotlin',
        isAvailable: true,
        users_ids: [],
        owner_id: 1,
      },
      {
        id: 2,
        name: 'project2',
        technologies: 'angular c#',
        isAvailable: true,
        users_ids: [],
        owner_id: 2,
      },
      {
        id: 3,
        name: 'project3',
        technologies: 'java react',
        isAvailable: true,
        users_ids: [],
        owner_id: 3,
      },
      {
        id: 4,
        name: 'project4',
        technologies: 'c++ c',
        isAvailable: true,
        users_ids: [],
        owner_id: 4,
      },
      {
        id: 5,
        name: 'project5',
        technologies: 'java kotlin',
        isAvailable: true,
        users_ids: [],
        owner_id: 5,
      },
      {
        id: 6,
        name: 'project6',
        technologies: 'angular c#',
        isAvailable: true,
        users_ids: [],
        owner_id: 6,
      },
      {
        id: 7,
        name: 'project7',
        technologies: 'java react',
        isAvailable: true,
        users_ids: [],
        owner_id: 7,
      },
      {
        id: 8,
        name: 'project8',
        technologies: 'c++ c',
        isAvailable: true,
        users_ids: [],
        owner_id: 8,
      },
      {
        id: 9,
        name: 'project5',
        technologies: 'java kotlin',
        isAvailable: true,
        users_ids: [],
        owner_id: 5,
      },
      {
        id: 10,
        name: 'project6',
        technologies: 'angular c#',
        isAvailable: true,
        users_ids: [],
        owner_id: 6,
      },
      {
        id: 11,
        name: 'project7',
        technologies: 'java react',
        isAvailable: true,
        users_ids: [],
        owner_id: 7,
      },
      {
        id: 12,
        name: 'project8',
        technologies: 'c++ c',
        isAvailable: true,
        users_ids: [],
        owner_id: 8,
      },
    ];
  }
}
