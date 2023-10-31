import { PokemonService } from './../../services/poke.service';
import { Component, Input, OnInit } from '@angular/core';
import { PokemonApi } from '../../interfaces/pokemon';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-info-pokemon',
  templateUrl: './info-pokemon.component.html',
  styleUrls: ['./info-pokemon.component.css']
})
export class InfoPokemonComponent implements OnInit {

  public pokemon: PokemonApi[] = [];
  public obj: PokemonCardComponent | any;

  constructor(private _pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    this.getPokeInfo()
  }

  @Input()
  data?: PokemonApi;

  async getPokeInfo() {
   /*  console.log(id); */
    (await this._pokemonService.getPokemon(3)).subscribe(
      res => {
        this.pokemon.push(res);
      },
      err => {
        console.log('Error', err)
      })
  }

}
