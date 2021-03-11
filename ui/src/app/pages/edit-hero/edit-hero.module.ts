import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EditHeroComponent } from './edit-hero.component';
import { CustomDirectivesModule } from 'src/app/custom-directives/custom-directives.module';
import { EditHeroRoutingModule } from './edit-hero-routing.module';

@NgModule({
  imports: [
    CommonModule,
    EditHeroRoutingModule,
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
  declarations: [EditHeroComponent],
})
export class EditHeroModule {}
