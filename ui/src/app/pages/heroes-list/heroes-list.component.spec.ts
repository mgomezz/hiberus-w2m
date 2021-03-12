import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs/internal/observable/of';
import { Hero } from 'src/app/models/hero.model';
import { HeroesService } from 'src/app/services/heroes/heroes.service';
import { environment } from 'src/environments/environment';

import { HeroesListComponent } from './heroes-list.component';

describe('HeroesListComponent', () => {
  let httpTestingController: HttpTestingController;
  let component: HeroesListComponent;
  let fixture: ComponentFixture<HeroesListComponent>;
  let heroesService: HeroesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroesListComponent],
      imports: [MatDialogModule, MatSnackBarModule, HttpClientTestingModule],
      providers: [HeroesService],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    heroesService = TestBed.inject(HeroesService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get all heroes onInit', (done) => {
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
    fixture.detectChanges();

    let spy = spyOn(heroesService, 'getHeroes').and.returnValue(of(mockHeroes));
    component.ngOnInit();

    spy.calls.mostRecent().returnValue.subscribe((heroes: Hero[]) => {
      fixture.detectChanges();
      expect(heroes).toEqual(mockHeroes);
      done();
    });

    const request = httpTestingController.expectOne(
      `${environment.apiUrl}/heroes`
    );

    expect(request.request.method).toBe('GET');

    request.flush([]);

    httpTestingController.verify();
  });
});
