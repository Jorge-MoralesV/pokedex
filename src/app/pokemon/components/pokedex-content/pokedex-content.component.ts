import { Component } from '@angular/core';
import { PokemonApi } from '../../interfaces/pokemon';
import { PokemonService } from '../../services/poke.service';

@Component({
  selector: 'app-pokedex-content',
  templateUrl: './pokedex-content.component.html',
  styleUrls: ['./pokedex-content.component.css']
})
export class PokedexContentComponent {


  public pokemon: PokemonApi[] = [];
  public initialValue: string = '';


}
