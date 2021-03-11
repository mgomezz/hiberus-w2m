import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditHeroComponent } from './edit-hero.component';

const routes: Routes = [{ path: '', component: EditHeroComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditHeroRoutingModule {}
