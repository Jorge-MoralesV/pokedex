import { FuncionsService } from './../../services/funciones.service';
import { PokemonApi } from '../../interfaces/pokemon';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/poke.service';
import { TiposColores } from 'src/app/interfaces/colores';
import { lastValueFrom } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';

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

  searchTerm: string = '';
  nombre: string = '';
  start: number = 0;
  end: number = 0;
  loading: boolean = true;

  constructor(
    private _pokeServ: PokemonService,
    private service: FuncionsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    //Obtiene el valor del input de busqueda
    this.service.variable$.subscribe((valor => {
      this.searchTerm = valor;
      this.searchPokemon();
    }))

    this.route.params.subscribe(params => {
      /** Obtener valores de la url */
      this.nombre = params['region'];
      this.start = +params['inicio'];
      this.end = +params['fin'];
      /** Enviar valores a los detalles del pokemon */
      /* this.service.nombre.next(this.nombre);
      this.service.start.next(this.start);
      this.service.end.next(this.end); */
      this.checkRegionLoad();
    })

    /*     this.service.start.subscribe((valorStart => {
          this.start = valorStart;
        }))

        this.service.end.subscribe((valorEnd => {
          this.end = valorEnd;
        })) */

  }

  checkRegionLoad() {
    //Verificar si start y end tiene valor
    if (this.start !== undefined && this.end !== undefined) {
      this.getRegion(this.start, this.end);
    } else {
      this.loading = false;
    }
  }

  /** Listas segun region */
  async getRegion(a: number, b: number) {
    // Reinicia el arreglo de pokemons
    this.pokemons = [];
    const promises = [];
    for (let index = a; index <= b; index++) {
      /** Excluye pokemon id=0 */
      if (index !== 0) {
        promises.push(lastValueFrom(this._pokeServ.getPokemonDetails(index + '')));
      }
    }
    try {
      const results = await Promise.all(promises);
      const validResults = results.filter(pokemon => pokemon !== undefined) as PokemonApi[];
      /** Ordena los pokemon por id */
      this.pokemons = validResults.sort((a, b) => a.id - b.id);
      //filteredPokemons siempre debe ser una copia de pokemons
      this.filteredPokemons = this.pokemons;
      this.loading = false;
    } catch (error) {
      console.error('Error al obtener los detalles de los Pokémon (por Región):', error);
      this.loading = false;
    }
  }

  goToPokemon(id: string) {
    this.service.setDetailsData(this.nombre, this.start, this.end);
    this.router.navigate(['/pokemon-details', id]);
  }

  /* Buscar Pokemon */
  searchPokemon() {
    const soloLetras = /^[a-zA-Z]+$/;
    const searchTerm = this.searchTerm.trim().toLowerCase();
    /** Si se busca por nombre */
    if (soloLetras.test(searchTerm)) {
      this.filteredPokemons = this.pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm)
      );
      /** Si se busca por id */
    } else if (searchTerm) {
      const searchId = parseInt(searchTerm, 10);
      if (!isNaN(searchId)) {
        this.filteredPokemons = this.pokemons.filter(pokemon =>
          pokemon.id === searchId
        );
      }
    } else {
      /* Si no hay contenido en la barra de busqueda regresa la lista actual */
      this.checkRegionLoad();
    }
  }

}
