import { ReadDetails } from './../../models/read-models/read-details';
import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpService } from './http.service';

describe('HttpService', () => {
  let injector: TestBed;
  let service: HttpService;
  let httpMock: HttpTestingController;
  let dummyDetails: ReadDetails[] = [
    {
      id: 1,
      noMembers: 2,
      description: 'test description',
      startDate: new Date(),
      project_id: 1,
    },
    {
      id: 2,
      noMembers: 4,
      description: 'new test description',
      startDate: new Date(),
      project_id: 2,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService],
    });

    injector = getTestBed();
    service = injector.get(HttpService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getById', () => {
    it('should return an Observable<ReadDetails> if object in need is of type ReadDetails', () => {
      service.getById('details', dummyDetails[0].id).subscribe((details) => {
        expect(details).toEqual(dummyDetails[0]);
      });

      const req = httpMock.expectOne('http://localhost:8080/api/details/1');
      expect(req.request.method).toBe('GET');
      req.flush(dummyDetails[0]);
    });
  });

  describe('getAll', () => {
    it('should return an Observable<ReadDetails[]> if object in need is of type ReadDetails[]', () => {
      service.getAll('details').subscribe((details: ReadDetails[]) => {
        expect(details.length).toBe(2);
        expect(details).toEqual(dummyDetails);
      });

      const req = httpMock.expectOne(`http://localhost:8080/api/details`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyDetails);
    });
  });

  describe('post', () => {
    it('should match object send in body after request with object to post', () => {
      const detailsTosend = dummyDetails[0];

      service.post("details", detailsTosend).subscribe();

      const req = httpMock.expectOne(`http://localhost:8080/api/details`);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(JSON.stringify(detailsTosend));
      expect(req.request.headers.get('Content-Type')).toEqual('application/json; charset=utf-8');
    });
  });

  describe('deleteById', () => {
    it('should have delete as request method', () => {
      service.deleteById(`details`, dummyDetails[0].id).subscribe();

      const req = httpMock.expectOne(`http://localhost:8080/api/details/${dummyDetails[0].id}`);
      expect(req.request.method).toEqual('DELETE');
    });
  });

  describe('patch', () => {
    it('should match object send in body after request with object to update', () => {
      const updatedDetails:ReadDetails = {
        id: dummyDetails[0].id,
        noMembers: dummyDetails[0].noMembers + 1,
        description: "new description to test",
        startDate: dummyDetails[0].startDate,
        project_id: dummyDetails[0].project_id,
      };

      service.patch(`details`, updatedDetails).subscribe();

      const req = httpMock.expectOne(`http://localhost:8080/api/details`);
      expect(req.request.method).toEqual('PATCH');
      expect(req.request.body).toEqual(JSON.stringify(updatedDetails));
      expect(req.request.headers.get('Content-Type')).toEqual('application/json; charset=utf-8');
    });
  });
});
