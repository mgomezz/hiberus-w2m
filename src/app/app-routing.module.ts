import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroFormComponent } from './pages/heroe-form/heroe-form.component';
import { HeroesListComponent } from './pages/heroes-list/heroes-list.component';

const routes: Routes = [
  { path: 'heroes-list', component: HeroesListComponent },
  { path: 'hero-form', component: HeroFormComponent },
  { path: '', redirectTo: 'heroes-list', pathMatch: 'full' },
  { path: '**', component: HeroesListComponent }, //TODO: Implementar not found page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
