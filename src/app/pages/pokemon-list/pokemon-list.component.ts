import { NgOptimizedImage } from '@angular/common';
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

  pokemons: PokemonApi[] = [];
  filteredPokemons: PokemonApi[] = [];
  searchTerm: string = '';
  public isLoading = true;
  regions: PokemonApi[] = [];

  ngOnInit(): void {
    this.getPoke();
    /*    this.getRegion(); */
  }

  /** Primera carga de pokemon */
  getPoke() {
    for (let index = 1; index <= 151; index++) {
      this.getPokemonInfo(index + '');
    }
  }

  /** Listas segun region */
  async getPokemonRegion(a: number, b: number) {
    for (let index = a; index <= b; index++) {
      this.pokemons = [];
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

  /* Buscar Pokemon */
  searchPokemon() {
    this.filteredPokemons = this.pokemons.filter((pokemon) =>
      pokemon.name.includes(this.searchTerm.toLowerCase())
    );
    console.log('Pokémon filtrados:', this.filteredPokemons);
  }

  /* Obtener regiones */
  /*   getRegion() {
      this._pokeServ.getRegions().subscribe(region => {
        this.regions.push(region);
        console.log(region);
      });
    } */




}
