import { Component } from '@angular/core';
import { PokemonApi } from './pokemon/interfaces/pokemon';
import { PokemonService } from './pokemon/services/poke.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor() { }

  title = 'pokedex';

}
