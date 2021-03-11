import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToUpperCaseDirective } from './toUpperCase.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ToUpperCaseDirective],
  exports: [ToUpperCaseDirective],
})
export class CustomDirectivesModule {}
