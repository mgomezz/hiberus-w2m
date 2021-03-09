import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public save(): void {
    this.router.navigate(['heroes'], { replaceUrl: true });
  }
}
