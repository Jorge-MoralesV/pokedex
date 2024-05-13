import { Component } from '@angular/core';
import { PokemonApi } from 'src/app/interfaces/pokemon';
import { PokemonService } from 'src/app/services/poke.service';

@Component({
  selector: 'app-sprite',
  templateUrl: './sprite.component.html',
  styleUrls: ['./sprite.component.css']
})
export class SpriteComponent {
  constructor(private _pokeServ: PokemonService) { }

  pokemon: PokemonApi[] = [];
  public isLoading = true;

  ngOnInit(): void {
    this.getAllPokemon();
  }

  async getAllPokemon() {
    for (let index = 1; index <= 151; index++) {
      this.getPokemonInfo(index + '');
    }
  }

  getPokemonInfo(index: string) {
    this._pokeServ.getPokemonDetails(index).subscribe(data => {
      this.pokemon.push(data);
      this.pokemon.sort((a, b) => (a.id > b.id) ? 1 : -1);
    });
  }
}
