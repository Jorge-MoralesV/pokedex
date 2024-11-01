import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from './pages/pokemon-details/pokemon-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'Kanto/1/151', pathMatch: 'full' },
  { path: ':region/:inicio/:fin', component: PokemonListComponent },
  { path: 'pokemon-details/:id', component: PokemonDetailsComponent },
  { path: '**', redirectTo: 'Kanto/1/151', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
