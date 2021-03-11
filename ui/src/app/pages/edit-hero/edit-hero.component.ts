import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  id!: string;
  formTitle: string = '';
  heroForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, Validators.required),
    superPower: new FormControl(null, Validators.required),
  });
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private heroesService: HeroesService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (!this.id) {
      this.formTitle = 'Create new Hero';
      return;
    }
    this.formTitle = 'Edit hero';
    this.heroesService.getHero(this.id).subscribe(
      (hero: Hero) => {
        this.heroForm.patchValue(hero);
      },
      (error: HttpErrorResponse) => {
        //TODO: implementar alertas para que el usuario se entere
        console.log(error.message);
      }
    );
  }
  public goBack() {
    this.location.back();
  }
  public save(): void {
    let hero: Hero = {
      id: this.id ? this.id : '',
      name: this.heroForm.get('name')?.value,
      description: this.heroForm.get('description')?.value,
      superPower: this.heroForm.get('superPower')?.value,
    };
    if (this.id) {
      this.heroesService.editHero(hero).subscribe(
        (res) => {
          this.router.navigate(['heroes'], { replaceUrl: true });
        },
        (error) => {}
      );
      return;
    }
    this.heroesService.addHero(hero).subscribe(
      (res) => {
        this.router.navigate(['heroes'], { replaceUrl: true });
      },
      (error) => {}
    );
  }
}
