import { Component, OnInit } from '@angular/core';
import { PokemonApi } from '../../interfaces/pokemon';
import { PokemonService } from '../../services/poke.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {

  public pokemon: PokemonApi[] = [];

  constructor(
    private _pokemonService: PokemonService,
  ) { }

  ngOnInit(): void {
    this.getAllPokemon();
  }

  async getAllPokemon() {
    for (let index = 1; index <= 9; index++) {
      (await this._pokemonService.getPokemon(index)).subscribe(
        res => {
          this.pokemon.push(res);
        },
        err => {
          console.log('Error', err)
        }
      )
    }

  }

  public getId(id: number) {
    console.log(id);
    return id;
  }

}
