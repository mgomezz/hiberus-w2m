import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[toUpperCase]',
})
export class ToUpperCaseDirective {
  constructor(public element: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: any): void {
    this.element.nativeElement.value = event.target.value.toUpperCase();
  }
}
