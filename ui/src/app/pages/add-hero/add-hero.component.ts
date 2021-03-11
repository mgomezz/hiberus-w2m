import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from 'src/app/models/hero.model';
import { Location } from '@angular/common';
import { HeroesService } from 'src/app/services/heroes/heroes.service';
import { ApiResponse } from 'src/app/models/api-response.model';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.scss'],
})
export class AddHeroComponent implements OnInit {
  formTitle: string = '';
  heroForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private heroesService: HeroesService
  ) {}

  ngOnInit(): void {
    this.initializeHeroForm();
  }

  initializeHeroForm(): void {
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
      id: '',
      name: this.form.name.value,
      description: this.form.description.value,
      superPower: this.form.superPower.value,
    };

    this.heroesService.addHero(hero).subscribe(
      (res: ApiResponse) => {
        this.router.navigate(['heroes'], { replaceUrl: true });
      },
      (error) => {}
    );
  }

  private get form(): { [key: string]: AbstractControl } {
    return this.heroForm.controls;
  }
}
