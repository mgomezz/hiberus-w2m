import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddHeroComponent } from './add-hero.component';
import { AddHeroRoutingModule } from './add-hero-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CustomDirectivesModule } from 'src/app/custom-directives/custom-directives.module';

@NgModule({
  imports: [
    CommonModule,
    AddHeroRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    CustomDirectivesModule,

    //ANGULAR MATERIAL MODULES
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  declarations: [AddHeroComponent],
})
export class AddHeroModule {}
