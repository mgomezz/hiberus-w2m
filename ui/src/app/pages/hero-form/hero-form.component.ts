import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from 'src/app/models/hero.model';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss'],
})
export class HeroFormComponent implements OnInit {
  heroForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, Validators.required),
    superPower: new FormControl(null, Validators.required),
  });

  constructor(
    private router: Router,
    private location: Location,
    private heroesService: HeroesService
  ) {}

  ngOnInit(): void {}

  public goBack() {
    this.location.back();
  }
  public save(): void {
    let hero: Hero = {
      id: '',
      name: this.heroForm.get('name')?.value,
      description: this.heroForm.get('description')?.value,
      superPower: this.heroForm.get('superPower')?.value,
    };

    this.heroesService.addHero(hero).subscribe(
      (res) => {
        this.router.navigate(['heroes'], { replaceUrl: true });
      },
      (error) => {}
    );
  }
}
