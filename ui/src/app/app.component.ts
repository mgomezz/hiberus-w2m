import { Component } from '@angular/core';
import { SpinnerService } from './shared/services/spinner/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public spinnerService: SpinnerService) {}
}
