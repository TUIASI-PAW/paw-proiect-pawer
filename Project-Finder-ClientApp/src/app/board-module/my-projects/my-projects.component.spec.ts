import { WriteProject } from './../../models/write-models/write-project';
import { TokenStorageService } from './../../services/token-storage-service/token-storage.service';
import { ReadUser } from './../../models/read-models/read-users';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from './../../services/http-service/http.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MyProjectsComponent } from './my-projects.component';
import { Component } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('MyProjectsComponent', () => {
  let fixture: ComponentFixture<MyProjectsComponent>;
  let component;
  const mockHttpService = jasmine.createSpyObj(['getAll', 'post']);
  const mockModalService = jasmine.createSpyObj(['open']);
  const mockTokenStorageService = jasmine.createSpyObj(['getUser']);
  let mockRouter;
  const dummyUser: ReadUser = {
    id: 1,
    username: 'test',
    email: 'test@yahoo.com',
    token: 'test',
  };
  const mockedWriteProject: WriteProject = {
    name: 'test-project',
    technologies: 'angular',
    isAvailable: true,
    users_ids: [dummyUser.id],
    owner_id: dummyUser.id,
  };

  mockModalService.open.and.callFake(() => {
    return {
      componentInstance: {},
      result: {
        then: () => of(true),
      },
    };
  });

  @Component({
    selector: 'app-add-modal',
    template: '<div></div>',
  })
  class AddModalComponent {}

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [MyProjectsComponent],
      providers: [
        { provide: HttpService, useValue: mockHttpService },
        { provide: TokenStorageService, useValue: mockTokenStorageService },
        { provide: Router, useValue: mockRouter },
        { provide: NgbModal, useValue: mockModalService },
      ],
    }).overrideModule(BrowserDynamicTestingModule, {
      set: { entryComponents: [AddModalComponent] },
    });

    fixture = TestBed.createComponent(MyProjectsComponent);
    component = fixture.componentInstance;

    mockTokenStorageService.getUser.and.returnValue(dummyUser);
  });

  describe('onInit', () => {
    it('should call getPage to get all projects', () => {
      mockHttpService.getAll.and.returnValue(of(true));

      component.ngOnInit();
      expect(mockHttpService.getAll).toHaveBeenCalledWith(
        `projects/myprojects/${dummyUser.id}?page=0&size=${component.pageSize}`
      );
    });
  });

  describe('getNextPage', () => {
    it('should call getPage to get all projects from next page', () => {
      component.currentPage = {
        number: 2,
      };
      mockHttpService.getAll.and.returnValue(of(true));

      component.getNextPage();
      expect(mockHttpService.getAll).toHaveBeenCalledWith(
        `projects/myprojects/${dummyUser.id}?page=3&size=${component.pageSize}`
      );
    });
  });

  describe('getPreviousPage', () => {
    it('should call getPage to get all projects from previous page', () => {
      component.currentPage = {
        number: 2,
      };
      mockHttpService.getAll.and.returnValue(of(true));

      component.getPreviousPage();
      expect(mockHttpService.getAll).toHaveBeenCalledWith(
        `projects/myprojects/${dummyUser.id}?page=1&size=${component.pageSize}`
      );
    });
  });

  describe('redirectToDetailsView', () => {
    it('should redirect to details view of coresponding details', () => {
      const mockedDetailsId = 1;

      component.redirectToDetailsView(mockedDetailsId);

      expect(mockRouter.navigate).toHaveBeenCalledWith([
        '/board/project',
        mockedDetailsId,
      ]);
    });
  });

  describe('searchForPattern', () => {
    it('should search for pattern introduced by user', () => {
      component.searchPattern = 'java';
      mockHttpService.getAll.and.returnValue(of(true));

      component.searchForPattern();

      expect(mockHttpService.getAll).toHaveBeenCalledWith(
        `projects/search/${dummyUser.id}?page=0&size=${component.pageSize}&pattern=${component.searchPattern}`
      );
    });
  });

  describe('createProject', () => {
    it('should open modal to insert data', () => {
      mockHttpService.post.and.returnValue(of(1));

      component.createProject();

      expect(mockModalService.open).toHaveBeenCalled();
    });
  });

  describe('getPage', () => {
    it('should get all of my projects if there is no filter or search pattern', () => {
      mockHttpService.getAll.and.returnValue(of(true));
      const pageNumber = 2;
      const pageSize = 10;

      component.getPage(pageNumber, pageSize);

      expect(mockHttpService.getAll).toHaveBeenCalledWith(
        `projects/myprojects/${dummyUser.id}?page=${pageNumber}&size=${pageSize}`
      );
    });

    it('should get all of my projects if there is pattern and find defined', () => {
      mockHttpService.getAll.and.returnValue(of(true));
      const pageNumber = 2;
      const pageSize = 10;
      const path = 'search';
      const key = 'pattern';
      const pattern = 'spring';

      component.getPage(pageNumber, pageSize, path, key, pattern);

      expect(mockHttpService.getAll).toHaveBeenCalledWith(
        `projects/search/${dummyUser.id}?page=${pageNumber}&size=${pageSize}&pattern=${pattern}`
      );
    });
  });
});
