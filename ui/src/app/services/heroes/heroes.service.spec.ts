import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { HeroesService } from './heroes.service';
import { Hero } from 'src/app/models/hero.model';
import { environment } from 'src/environments/environment';
import { ApiResponse } from 'src/app/models/api-response.model';

describe('HeroesService', () => {
  let httpTestingController: HttpTestingController;
  let service: HeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroesService],
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HeroesService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all heroes', () => {
    const mockHeroes: Array<Hero> = [
      {
        id: 'xyyasdasdQwe',
        name: 'SPIDERMAN',
        description: 'Spiderman description',
        superPower: 'Spiderman superpower',
      },
      {
        id: 'ssdxxwerggsdf',
        name: 'AQUAMAN',
        description: 'Aquaman description',
        superPower: 'Aquaman superpower',
      },
      {
        id: 'sdhfhwerwerwerwer',
        name: 'THOR',
        description: 'Thor description',
        superPower: 'Thor superpower',
      },
    ];

    service.getHeroes().subscribe((heroes: Hero[]) => {
      expect(heroes).toEqual(mockHeroes);
    });

    const request = httpTestingController.expectOne(
      `${environment.apiUrl}/heroes`
    );

    expect(request.request.method).toBe('GET');

    request.flush(mockHeroes);

    httpTestingController.verify();
  });

  it('should get hero by id', () => {
    const id = 'sdjjwjwennwe';
    const mockHero: Hero = {
      id: 'sdjjwjwennwe',
      name: 'SPIDERMAN',
      description: 'Spiderman description',
      superPower: 'Spiderman superpower',
    };

    service.getHero(id).subscribe((hero: Hero) => {
      expect(hero).toEqual(mockHero);
    });

    const request = httpTestingController.expectOne(
      `${environment.apiUrl}/hero/${id}`
    );

    expect(request.request.method).toBe('GET');

    request.flush(mockHero);

    httpTestingController.verify();
  });

  it('should edit hero', () => {
    const id = 'hhdbbwuhw';

    const mockHero: Hero = {
      id: 'hhdbbwuhw',
      name: 'SPIDERMAN',
      description: 'Spiderman description',
      superPower: 'Spiderman superpower',
    };

    const mockApiResponse: ApiResponse = {
      status: true,
      message: `Hero ${mockHero.name} edited succesfully`,
      data: undefined,
    };

    service.editHero(mockHero).subscribe((apiResponse: ApiResponse) => {
      expect(apiResponse).toEqual(mockApiResponse);
    });

    const request = httpTestingController.expectOne(
      `${environment.apiUrl}/hero`
    );

    expect(request.request.method).toBe('PUT');

    request.flush(mockApiResponse);

    httpTestingController.verify();
  });

  it('should delete a hero by id', () => {
    const id = 'dasdasdasd';

    const mockResponse: ApiResponse = {
      status: true,
      message: `Hero ${id} deleted succesfully`,
      data: [{}],
    };

    service.deleteHero(id).subscribe((response: ApiResponse) => {
      expect(mockResponse).toEqual(response);
    });

    const request = httpTestingController.expectOne(
      `${environment.apiUrl}/hero/${id}`
    );

    expect(request.request.method).toBe('DELETE');

    request.flush(mockResponse);

    httpTestingController.verify();
  });
});
