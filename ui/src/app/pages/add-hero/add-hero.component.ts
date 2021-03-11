import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Hero } from 'src/app/models/hero.model';
import { Location } from '@angular/common';
import { HeroesService } from 'src/app/services/heroes/heroes.service';
import { ApiResponse } from 'src/app/models/api-response.model';
import { MessageNotificationService } from 'src/app/services/message-notification/message-notification.service';
import { HttpErrorResponse } from '@angular/common/http';

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
    private router: Router,
    private location: Location,
    private heroesService: HeroesService,
    private messageNotificationService: MessageNotificationService
  ) {}

  ngOnInit(): void {
    this.initializeHeroForm();
  }

  private initializeHeroForm(): void {
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
      name: this.heroForm.get('name')?.value,
      description: this.heroForm.get('description')?.value,
      superPower: this.heroForm.get('superPower')?.value,
    };

    this.heroesService.addHero(hero).subscribe(
      (response: ApiResponse) => {
        this.messageNotificationService.notifySuccess(response.message);
        this.router.navigate(['heroes'], { replaceUrl: true });
      },
      (error: HttpErrorResponse) => {
        this.messageNotificationService.notifyError(error.message);
      }
    );
  }
}
