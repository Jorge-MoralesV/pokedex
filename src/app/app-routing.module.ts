import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InfoPokemonComponent } from './pokemon/components/info-pokemon/info-pokemon.component';
import { PokedexContentComponent } from './pokemon/components/pokedex-content/pokedex-content.component';

const routes: Routes = [
  {
    path: '**',
    redirectTo: 'app-pokedex-content'
  },
  {
    path: 'InfoPoke',
    component: InfoPokemonComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
