import { EvolutionChain } from './../../interfaces/pokemonSpecies';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/poke.service';
import { PokemonApi } from 'src/app/interfaces/pokemon';
import { PokemonSpecies } from 'src/app/interfaces/pokemonSpecies';
import { TiposColores } from 'src/app/interfaces/colores';
import { filter, lastValueFrom, map, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { FuncionsService } from 'src/app/services/funciones.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})

export class PokemonDetailsComponent implements OnInit, OnDestroy {

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

  pokemon: PokemonApi[] = [];
  pokeDetails: PokemonSpecies[] = [];
  filteredPokemons: PokemonApi[] = [];
  evolutionChain: any[] = [];
  evolutionNames: string[] = [];

  idPokemon: string;
  description: string;
  species: string;
  abilities: string;
  beforeSprite: string;
  afterSprite: string;

  fisrtBtn = true;
  lastBtn = true;
  loading = true;

  nombre: string = '';
  start: number = 0;
  end: number = 0;

  //Id de la Url
  id: string = '';

  private routeSub: Subscription;

  constructor(
    private aRouter: ActivatedRoute,
    private _pokeService: PokemonService,
    private service: FuncionsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    /** Trae los valores de la lista de la url */
    this.service.nombre.subscribe((valorNombre => {
      this.nombre = valorNombre;
    }));
    this.service.start.subscribe((valorStart => {
      this.start = valorStart;
    }));
    this.service.end.subscribe((valorEnd => {
      this.end = valorEnd;
    }));

    this.aRouter.params.subscribe(params => {
      this.id = params['id'];
      this.clearData();
      this.getPokemonInfoAndDetails(this.id);
    })

    this.btnFirstLastPkm();
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  clearData() {
    this.pokemon = [];
    this.pokeDetails = [];
    this.filteredPokemons = [];
    this.evolutionChain = [];
    this.evolutionNames = [];
  }

  // Obtiene la información del Pokémon
  async getPokemonInfoAndDetails(pokeId: string) {
    this._pokeService.getPokemonDetails(pokeId).subscribe(detailData => {
      this.pokemon.push(detailData);
      this.idPokemon = detailData.id.toString();
      this.getSprite(this.idPokemon);
      this.getSpecies(this.idPokemon);
      this.getDescripcion(this.idPokemon);
      // Obtiene información adicional que no se encontró en el método anterior
      this._pokeService.getPokemonSpecie(pokeId).subscribe(specieData => {
        this.pokeDetails.push(specieData);
        //Obtengo la url del JSON de las evoluciones y la mando
        const urlEvo = specieData.evolution_chain.url;
        this.getEvolutions(urlEvo);
        this.loading = false;
      });
    });
  }

  //Obtengo la url de las evoluciones
  getEvolutions(url: string) {
    this._pokeService.getEvolutionChain(url).subscribe(evolucionData => {
      //Se convierte la cadena y se guarda los nombres
      this.evolutionNames = this.parseEvolutionChain(evolucionData.chain);
      this.getSpritesChain(this.evolutionNames);
    })
  }

  parseEvolutionChain(chain: any) {
    let names: any[] = [];
    const traverseChain = (stage: { species: { name: any; }; evolves_to: any[]; }) => {
      names.push(stage.species.name);
      // Recorrer todas las posibles evoluciones
      stage.evolves_to.forEach(nextStage => {
        traverseChain(nextStage);
      });
    };
    traverseChain(chain);
    return names;
  }

  /** Obtiene los datos de un pokemon para mostrarlos en su cadena de evolución */
  getSpritesChain(cadena: string[]) {
    const promises = cadena.map(name => lastValueFrom(this._pokeService.getPokemonDetails(name)));
    Promise.all(promises).then(results => {
      this.evolutionChain = results.map(pokemon => ({
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types,
        sprite: pokemon.sprites.front_default
      }))
    }).catch(error => console.error('Error al obtener los sprites: ', error));
  }

  //Obtiene la descripción del pokemon en español
  getDescripcion(pokeId: string) {
    this._pokeService.getPokemonSpecie(pokeId).pipe(
      map(data => {
        const entrada = data.flavor_text_entries.find(entry => entry.language.name === 'es') || data.flavor_text_entries.find(entry => entry.language.name === 'en');
        return entrada ? entrada.flavor_text.replace(/\\n/g, ' ') : ' ';
      })
    ).subscribe(description => {
      this.description = description;
    })
  }

  /** Obtiene el tipo de pokemon, ej: Pikachu, Pokemon ratón */
  getSpecies(pokeId: string) {
    this._pokeService.getPokemonSpecie(pokeId).pipe(
      map(data => {
        const species = data.genera.find(gener => gener.language.name === 'es') || data.genera.find(gener => gener.language.name === 'en');
        return species ? species.genus : '';
      })
    ).subscribe(genus => {
      this.species = genus;
    })
  }

  /** Mostrar los botones de anterior y siguiente */
  btnFirstLastPkm() {
    if (Number(this.id) === 1) this.fisrtBtn = false;
    else if (Number(this.id) === 1025) this.lastBtn = false;
  }

  //Obtiene los sprites de los pokemon en los botones de avance
  getSprite(pokeId: string) {
    const idBefore = (parseInt(pokeId) - 1).toString();
    const idAfter = (parseInt(pokeId) + 1).toString();
    /** Sprite del pokemon anterior */
    this._pokeService.getPokemonDetails(idBefore).subscribe(sprite => {
      this.beforeSprite = sprite.sprites.front_default;
    })
    /** Sprite del siguiente pokemon */
    this._pokeService.getPokemonDetails(idAfter).subscribe(sprite => {
      this.afterSprite = sprite.sprites.front_default;
    })
  }

  /** Regresa a la lista */
  backList() {
    this.router.navigate([this.nombre, this.start, this.end]);
  }

  /** Navega entre los pokemon */
  nextPokemon(id: number) {
    this.router.navigate(['/pokemon-details', id]);
  }

}
