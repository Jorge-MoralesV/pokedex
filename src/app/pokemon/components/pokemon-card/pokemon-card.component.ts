import { Component, OnInit, Output } from '@angular/core';
import { PokemonApi } from '../../interfaces/pokemon';
import { PokemonService } from '../../services/poke.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {

  public pokemon: PokemonApi[] = [];

  constructor(private _pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getAllPokemon();
  }

  async getAllPokemon() {
    for (let index = 1; index <= 25; index++) {
      this.getPokeInfo(index);
    }
  }

  async getPokeInfo(id: number) {
    (await this._pokemonService.getPokemon(id)).subscribe(
      res => {
        console.log(id)
        this.pokemon.push(res);
      },
      err => {
        console.log('Error', err)
      })
  }

  getId(id: number) {
    console.log(id)
  }

}
