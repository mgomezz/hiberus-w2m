import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[toUpperCase]',
})
export class ToUpperCaseDirective {
  constructor(public element: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event']) onInput(event: any): void {
    let upperCaseInput = this.element.nativeElement.value.toUpperCase();
    this.control.control?.setValue(upperCaseInput);
  }
}
