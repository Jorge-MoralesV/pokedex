import { PokemonApi } from '../../interfaces/pokemon';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/poke.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  constructor(private _pokeServ: PokemonService) { }

  public pokemons: PokemonApi[] = [];
  public filteredPokemons: PokemonApi[] = [];

  searchId: number | undefined;

  ngOnInit(): void {
    this.getPoke();
  }

  /* Primera carga de pokemon */
  getPoke() {
    for (let index = 1; index <= 151; index++) {
      this.getPokemonInfo(index + '');
    }
  }

  /** Lista los pokemon filtrados */
  getPokemonInfo(index: string) {
    this._pokeServ.getPokemonDetails(index).subscribe(pokemon => {
      this.pokemons.push(pokemon);
      this.pokemons.sort((a, b) => (a.id > b.id) ? 1 : -1);
      this.filteredPokemons = [...this.pokemons];
    });
  }

  /** Listas segun region */
  async getPokemonRegion(a: number, b: number) {
    for (let index = a; index <= b; index++) {
      this.pokemons = [];
      this.getPokemonInfo(index + '');
    }
  }

  /* Buscar Pokemon */
  searchPokemon(searchName: string) {
    const soloLetras = /^[a-zA-Z]+$/;
    //Evalua si searchName tiene letras
    if (soloLetras.test(searchName)) {
      this.filteredPokemons = this.pokemons.filter(pokemon =>
        pokemon.name.includes(searchName.toLowerCase())
      )
      //Si tiene puros numeros
    } else if (searchName) {
      this.searchId = parseInt(searchName);
      this.filteredPokemons = this.pokemons.filter(pokemon =>
        pokemon.id === this.searchId
      )
    }
  }

}
