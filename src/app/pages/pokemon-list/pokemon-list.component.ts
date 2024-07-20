import { FuncionsService } from './../../services/funciones.service';
import { PokemonApi } from '../../interfaces/pokemon';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/poke.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  public pokemons: PokemonApi[] = [];
  public filteredPokemons: PokemonApi[] = [];

  searchId: number | undefined;

  start: number = 0;
  end: number = 0;
  searchTerm: string = '';

  cargando: boolean = true;

  constructor(private _pokeServ: PokemonService, private service: FuncionsService) { }

  ngOnInit(): void {

    this.service.variable$.subscribe((valor => {
      this.searchTerm = valor;
      this.searchPokemon();
    }))

    this.service.start.subscribe((valorStart => {
      this.start = valorStart;
    }))

    this.service.end.subscribe((valorEnd => {
      this.end = valorEnd;
    }))

    this.service.cargando.subscribe((valorCarga => {
      this.cargando = valorCarga;
    }))

    this.service.end.subscribe(() => {
      //Verificar si start y end tiene valor
      if (this.start !== undefined && this.end !== undefined) {
        this.getRegion(this.start, this.end);
        //Si no los tiene resetea el arreglo y muestra los default
      }/*  else {
        this.pokemons = [];
        this.getPoke();
      } */
    })

    /* this.getPoke(); */

  }

  /* Primera carga de pokemon */
  /*   getPoke() {
      for (let index = 1; index <= 151; index++) {
        this.getPokemonInfo(index + '');
      }
    } */

  /** Lista los pokemon filtrados */
  getPokemonInfo(index: string) {
    this._pokeServ.getPokemonDetails(index).subscribe(pokemon => {
      this.pokemons.push(pokemon);
      this.pokemons.sort((a, b) => (a.id > b.id) ? 1 : -1);
      this.filteredPokemons = [...this.pokemons];
    });
  }

  /** Listas segun region */
  async getRegion(a: number, b: number) {
    this.pokemons = [];
    for (let index = a; index <= b; index++) {
      this.getPokemonInfo(index + '');
    }
  }

  /* Buscar Pokemon */
  searchPokemon() {
    const soloLetras = /^[a-zA-Z]+$/;
    //Evalua si searchName tiene letras
    if (soloLetras.test(this.searchTerm)) {
      this.filteredPokemons = this.pokemons.filter(pokemon =>
        pokemon.name.includes(this.searchTerm.toLowerCase())
      )
      //Si tiene puros numeros
    } else if (this.searchTerm) {
      this.searchId = parseInt(this.searchTerm);
      this.filteredPokemons = this.pokemons.filter(pokemon =>
        pokemon.id === this.searchId
      )
    } else {
      this.getRegion(1, 151);
    }

  }


}
