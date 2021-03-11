import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesListComponent } from './pages/heroes-list/heroes-list.component';

const routes: Routes = [
  {
    path: 'heroes',
    loadChildren: () =>
      import(`./pages/heroes-list/heroes-list.module`).then(
        (m) => m.HeroesListModule
      ),
  },
  {
    path: 'add-hero',
    loadChildren: () =>
      import(`./pages/add-hero/add-hero.module`).then((m) => m.AddHeroModule),
  },
  {
    path: 'edit-hero/:id',
    loadChildren: () =>
      import(`./pages/edit-hero/edit-hero.module`).then(
        (m) => m.EditHeroModule
      ),
  },
  { path: '', redirectTo: 'heroes', pathMatch: 'full' },
  { path: '**', component: HeroesListComponent }, //TODO: Implementar not found page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
