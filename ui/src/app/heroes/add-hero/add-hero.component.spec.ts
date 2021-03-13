import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiResponse } from 'src/app/shared/models/api-response.model';
import { Hero } from 'src/app/shared/models/hero.model';
import { HeroesService } from 'src/app/heroes/services/heroes/heroes.service';
import { environment } from 'src/environments/environment';

import { AddHeroComponent } from './add-hero.component';

describe('AddHeroComponent', () => {
  let httpTestingController: HttpTestingController;
  let component: AddHeroComponent;
  let fixture: ComponentFixture<AddHeroComponent>;
  let heroesService: HeroesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatSnackBarModule,
      ],
      declarations: [AddHeroComponent],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    heroesService = TestBed.inject(HeroesService);
    fixture = TestBed.createComponent(AddHeroComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should initialize heroForm', () => {
    const hero = {
      name: '',
      description: '',
      superPower: '',
    };
    component.initializeHeroForm();
    expect(component.heroForm.value).toEqual(hero);
  });

  it('heroForm invalid when empty', () => {
    expect(component.heroForm.valid).toBeFalsy();
  });

  it('Should invalidate heroForm', () => {
    component.heroForm.controls['name'].setValue('');
    component.heroForm.controls['description'].setValue('');
    component.heroForm.controls['superPower'].setValue('');
    expect(component.heroForm.valid).toBeFalsy();
    expect(
      fixture.debugElement.nativeElement.querySelector('button[type="submit"]')
        .disabled
    ).toBe(true);
  });

  it('Should validate heroForm', () => {
    component.heroForm.controls['name'].setValue('SPIDERMAN');
    component.heroForm.controls['description'].setValue(
      'Spiderman description'
    );
    component.heroForm.controls['superPower'].setValue('Spiderman superpower');
    expect(component.heroForm.valid).toBeTruthy();
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector('button[type="submit"]')
        .disabled
    ).toBe(false);
  });

  it('name, descripcition, superpower fields validity on create', () => {
    let name = component.heroForm.controls['name'];
    expect(name.valid).toBeFalsy();
    let description = component.heroForm.controls['description'];
    expect(description.valid).toBeFalsy();
    let superPower = component.heroForm.controls['superPower'];
    expect(superPower.valid).toBeFalsy();
  });

  it('add hero when submit form', () => {
    expect(component.heroForm.valid).toBeFalsy();
    component.heroForm.controls['name'].setValue('SPIDERMAN');
    component.heroForm.controls['description'].setValue(
      'Spiderman description'
    );
    component.heroForm.controls['superPower'].setValue('Spiderman superpower');

    expect(component.heroForm.valid).toBeTruthy();

    const mockApiResponse: ApiResponse = {
      status: true,
      message: `Hero added succesfully`,
      data: undefined,
    };

    const mockHero: Hero = {
      id: '',
      name: component.heroForm.controls['name'].value,
      description: component.heroForm.controls['description'].value,
      superPower: component.heroForm.controls['superPower'].value,
    };

    heroesService.addHero(mockHero).subscribe((apiResponse: ApiResponse) => {
      expect(apiResponse).toEqual(mockApiResponse);
    });

    const request = httpTestingController.expectOne(
      `${environment.apiUrl}/hero`
    );

    expect(request.request.method).toBe('POST');

    request.flush(mockApiResponse);

    httpTestingController.verify();
  });
});
