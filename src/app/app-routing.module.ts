import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroFormComponent } from './pages/hero-form/hero-form.component';
import { HeroesListComponent } from './pages/heroes-list/heroes-list.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesListComponent },
  { path: 'add-hero', component: HeroFormComponent },
  { path: 'edit-hero/:id', component: HeroFormComponent },
  { path: '', redirectTo: 'heroes', pathMatch: 'full' },
  { path: '**', component: HeroesListComponent }, //TODO: Implementar not found page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
