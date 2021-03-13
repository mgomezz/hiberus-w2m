import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HeroesService } from 'src/app/shared/services/heroes/heroes.service';
import { MessageNotificationService } from 'src/app/shared/services/message-notification/message-notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Hero } from 'src/app/shared/models/hero.model';
import { ApiResponse } from 'src/app/shared/models/api-response.model';
import { SpinnerService } from 'src/app/shared/services/spinner/spinner.service';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.scss'],
})
export class AddHeroComponent implements OnInit {
  heroForm: FormGroup = new FormGroup({});

  constructor(
    public spinnerService: SpinnerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location,
    private heroesService: HeroesService,
    private messageNotificationService: MessageNotificationService
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
