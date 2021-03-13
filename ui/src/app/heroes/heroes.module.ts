import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroesComponent } from './heroes.component';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { EditHeroComponent } from './edit-hero/edit-hero.component';
import { AddHeroComponent } from './add-hero/add-hero.component';
import { DeleteConfirmDialogComponent } from './heroes-list/delete-confirm-dialog/delete-confirm-dialog.component';
import { HeroesService } from './services/heroes/heroes.service';

@NgModule({
  declarations: [
    HeroesComponent,
    HeroesListComponent,
    EditHeroComponent,
    AddHeroComponent,
    DeleteConfirmDialogComponent,
  ],
  providers: [HeroesService],
  imports: [CommonModule, HeroesRoutingModule, SharedModule],
})
export class HeroesModule {}
