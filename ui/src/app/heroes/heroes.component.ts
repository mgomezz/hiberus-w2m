import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../shared/services/spinner/spinner.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  constructor(public spinnerService: SpinnerService) {}

  ngOnInit() {}
}
