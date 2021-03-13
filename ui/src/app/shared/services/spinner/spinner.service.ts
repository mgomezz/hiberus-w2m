import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  visibility = new BehaviorSubject<boolean>(false);

  constructor() {}

  show(): void {
    setTimeout(() => {
      this.visibility.next(true);
    });
  }

  hide(): void {
    setTimeout(() => {
      this.visibility.next(false);
    });
  }
}
