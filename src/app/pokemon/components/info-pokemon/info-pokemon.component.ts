import { PokemonService } from './../../services/poke.service';
import { Component, Input, OnInit } from '@angular/core';
import { PokemonApi } from '../../interfaces/pokemon';

@Component({
  selector: 'app-info-pokemon',
  templateUrl: './info-pokemon.component.html',
  styleUrls: ['./info-pokemon.component.css']
})
export class InfoPokemonComponent implements OnInit {

  public pokemon: PokemonApi[] = [];

  constructor(private _pokemonService: PokemonService) { }

  @Input() idPoke: number | any;

  ngOnInit(): void {
    this.getPokeInfo(this.idPoke)
    console.log(this.idPoke)
  }

  async getPokeInfo(id: number) {
    (await this._pokemonService.getPokemon(151)).subscribe(
      res => {
        this.pokemon.push(res);
      },
      err => {
        console.log('Error', err)
      })
  }

}
