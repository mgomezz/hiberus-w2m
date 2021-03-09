import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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

  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {}

  public goBack() {
    this.location.back();
  }
  public save(): void {
    this.router.navigate(['heroes'], { replaceUrl: true });
  }
}
