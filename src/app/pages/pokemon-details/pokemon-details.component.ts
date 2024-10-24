import { EvolutionChain } from './../../interfaces/pokemonSpecies';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/poke.service';
import { PokemonApi } from 'src/app/interfaces/pokemon';
import { PokemonSpecies } from 'src/app/interfaces/pokemonSpecies';
import { TiposColores } from 'src/app/interfaces/colores';
import { map } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})

export class PokemonDetailsComponent implements OnInit {

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
  descripcion: string;
  species: string;
  fisrtBtn = true;
  lastBtn = true;
  abilities: string;
  beforeSprite: string;
  afterSprite: string;

  evolutionChain: any;
  cargando = true;

  idPokemon: string;

  //Id de la Url
  id: string | null;

  constructor(private aRouter: ActivatedRoute, private _pokeService: PokemonService, private location: Location) {
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getPokemonInfoAndDetails(this.id + '');
    this.btnFirstLastPkm();
  }

  async getPokemonInfoAndDetails(pokeId: string) {
    // Obtiene la información del Pokémon
    this._pokeService.getPokemonDetails(pokeId).subscribe(detailData => {
      this.pokemon.push(detailData);
      this.idPokemon = detailData.id.toString();
      this.getSprite(this.idPokemon);
      this.getSpecies(this.idPokemon);
      this.getDescripcion(this.idPokemon);

      // Obtiene información adicional que no se encontró en el método anterior
      this._pokeService.getPokemonSpecie(pokeId).subscribe(specieData => {
        this.pokeDetails.push(specieData);

        // Obtiene la cadena evolutiva
/*         const evolutionChainUrl = specieData.evolution_chain.url;
        const evolutionChainId = evolutionChainUrl.split('/')[6]; // Extrae el ID de la URL

        this._pokeService.getEvolutionChain(evolutionChainId).subscribe(evolutionData => {
          this.evolutionChain = this.parseEvolutionChain(evolutionData.chain);
        });
        */
        this.cargando = false;
      });
    });
  }
/*
  parseEvolutionChain(chain: any){
    let evolutions = [];
    let currentStage = chain;

    while(currentStage){
      evolutions.push(currentStage.spacies.name);
      currentStage = currentStage.evolves_to[0];
    }
    return evolutions;
  } */


  //Obtiene la descripcion del pokemon en español
  getDescripcion(pokeId: string) {
    this._pokeService.getPokemonSpecie(pokeId).pipe(
      map(data => {
        const entrada = data.flavor_text_entries.find(entry => entry.language.name === 'es') || data.flavor_text_entries.find(entry => entry.language.name === 'en');
        return entrada ? entrada.flavor_text.replace(/\\n/g, ' ') : ' ';
      })
    ).subscribe(description => {
      this.descripcion = description;
    })
  }

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

  btnFirstLastPkm() {
    if (Number(this.id) === 1) this.fisrtBtn = false;
    else if (Number(this.id) === 1025) this.lastBtn = false;
  }

  //Obtiene los sprites de los pokemon en los botones de avance
  getSprite(pokeId: string) {
    const idBefore = (parseInt(pokeId) - 1).toString();
    const idAfter = (parseInt(pokeId) + 1).toString();
    this._pokeService.getPokemonDetails(idBefore).subscribe(sprite => {
      this.beforeSprite = sprite.sprites.front_default;
    })
    this._pokeService.getPokemonDetails(idAfter).subscribe(sprite => {
      this.afterSprite = sprite.sprites.front_default;
    })
  }

}
