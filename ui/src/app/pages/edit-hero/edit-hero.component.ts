import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from 'src/app/models/hero.model';
import { HeroesService } from 'src/app/services/heroes/heroes.service';
import { MessageNotificationService } from 'src/app/services/message-notification/message-notification.service';
import { ApiResponse } from 'src/app/models/api-response.model';

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
    private heroesService: HeroesService,
    private messageNotificationService: MessageNotificationService
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
        this.messageNotificationService.notifyError(error.message);
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
