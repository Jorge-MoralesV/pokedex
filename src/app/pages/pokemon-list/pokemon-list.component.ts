import { FuncionsService } from './../../services/funciones.service';
import { PokemonApi } from '../../interfaces/pokemon';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/poke.service';
import { TiposColores } from 'src/app/interfaces/colores';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  tiposColores: TiposColores = {
    bug: '#91C12F',
    grass: '#63BC5A',
    fairy: '#EC8FE6',
    normal: '#919AA2',
    dragon: '#0B6DC3',
    psychic: '#FA7179',
    ghost: '#5269AD',
    ground: '#D97845',
    steel: '#5A8EA2',
    fire: '#FF9D55',
    flying: '#89AAE3',
    ice: '#73CEC0',
    electric: '#F4D23C',
    rock: '#C5B78C',
    dark: '#5A5465',
    water: '#5090D6',
    fighting: '#CE416B',
    poison: '#B567CE'
  };

  public pokemons: PokemonApi[] = [];
  public filteredPokemons: PokemonApi[] = [];
  tiposArray: string[] = [];

  searchId: number | undefined;

  start: number = 0;
  end: number = 0;
  searchTerm: string = '';

  cargando = true;

  constructor(private _pokeServ: PokemonService, private service: FuncionsService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    //Gif de carga
    this.service.cargando.subscribe((valorCarga => {
      this.cargando = valorCarga;
    }))

    //Obtiene el valor del input de busqueda
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

    this.service.end.subscribe(() => {
      //Verificar si start y end tiene valor
      if (this.start !== undefined && this.end !== undefined) {
        this.getRegion(this.start, this.end);
      }
    })

  }

  /** Listas segun region */
  async getRegion(a: number, b: number) {

    this.pokemons = []; // Reinicia el arreglo de pokemons
    const promises = [];

    for (let index = a; index <= b; index++) {
      if (index !== 0) {
        promises.push(lastValueFrom(this._pokeServ.getPokemonDetails(index + '')));
      }
    }

    try {
      const results = await Promise.all(promises);
      const validResults = results.filter(pokemon => pokemon !== undefined) as PokemonApi[];
      this.pokemons = validResults.sort((a, b) => a.id - b.id);
      this.filteredPokemons = this.pokemons; // Si filteredPokemons siempre debe ser una copia de pokemons
      this.cdr.detectChanges(); // Forzar la detección de cambios si es necesario
      this.cargando = false;
    } catch (error) {
      console.error('Error al obtener los detalles de los Pokémon (por Región):', error);
      this.cargando = false;
    }
  }

  /** Lista los pokemon filtrados */
  getPokemonInfo(index: string) {
    this._pokeServ.getPokemonDetails(index).subscribe({
      next: (pokemon) => {
        this.pokemons = this.pokemons.concat(pokemon).sort((a, b) => a.id - b.id);
        this.filteredPokemons = this.pokemons;
      },
      error: (error) => {
        console.error('Error al obtener los detalles del pokemon (Lista común): ', error);
      }
    }
    )
  }

  /* Buscar Pokemon */
  searchPokemon() {
    const soloLetras = /^[a-zA-Z]+$/;
    const searchTerm = this.searchTerm.trim().toLowerCase();

    if (soloLetras.test(searchTerm)) {
      this.filteredPokemons = this.pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm)
      );
    } else if (searchTerm) {
      const searchId = parseInt(searchTerm, 10);
      if (!isNaN(searchId)) {
        this.filteredPokemons = this.pokemons.filter(pokemon =>
          pokemon.id === searchId
        );
      }
    } else {
      this.getRegion(1, 151);
    }
  }

}
