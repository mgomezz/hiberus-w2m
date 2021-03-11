import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from 'src/app/models/hero.model';
import { HeroesService } from 'src/app/services/heroes/heroes.service';

@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.scss'],
})
export class EditHeroComponent implements OnInit {
  heroId: string = '';
  heroForm: FormGroup = new FormGroup({});

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder,
    private heroesService: HeroesService
  ) {}

  ngOnInit(): void {
    this.heroId = this.route.snapshot.params['id'];
    this.initializetHeroForm();
    this.getHero();
  }

  private getHero(): void {
    this.heroesService.getHero(this.heroId).subscribe(
      (hero: Hero) => {
        this.heroForm.patchValue(hero);
      },
      (error: HttpErrorResponse) => {
        //TODO: implementar alertas para que el usuario se entere
        console.log(error.message);
      }
    );
  }

  private initializetHeroForm(): void {
    this.heroForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      superPower: ['', [Validators.required]],
    });
  }

  goBack() {
    this.location.back();
  }

  save(): void {
    let hero: Hero = {
      id: this.heroId,
      name: this.heroForm.get('name')?.value,
      description: this.heroForm.get('description')?.value,
      superPower: this.heroForm.get('superPower')?.value,
    };

    this.heroesService.editHero(hero).subscribe(
      (res) => {
        this.router.navigate(['heroes'], { replaceUrl: true });
      },
      (error) => {}
    );
  }
}
