import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokedexNavbarComponent } from './pokemon/components/pokedex-navbar/pokedex-navbar.component';
import { PokemonCardComponent } from './pokemon/components/pokemon-card/pokemon-card.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonService } from './pokemon/services/poke.service';
import { InfoPokemonComponent } from './pokemon/components/info-pokemon/info-pokemon.component';
import { PokedexContentComponent } from './pokemon/components/pokedex-content/pokedex-content.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    PokedexNavbarComponent,
    PokemonCardComponent,
    InfoPokemonComponent,
    PokedexContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
