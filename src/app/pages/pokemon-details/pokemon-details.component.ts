import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/poke.service';
import { PokemonApi } from 'src/app/interfaces/pokemon';
import { PokemonSpecies } from 'src/app/interfaces/pokemonSpecies';
import { TiposColores } from 'src/app/interfaces/colores';

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
  id: string | null;
  descripcion: string | undefined;
  anteriorBtn = true;

  constructor(private aRouter: ActivatedRoute, private _pokeService: PokemonService) {
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getPokemonInfoAndDetails(this.id + '');
    this.getDescripcion(this.id + '');
    this.pokeById0();
  }

  getPokemonInfoAndDetails(pokeId: string) {
    //Obtiene la informacion del pokemon
    this._pokeService.getPokemonDetails(pokeId).subscribe(detailData => {
      this.pokemon.push(detailData);
      //Obtiene informacion adicional que no se encontro en el metodo anterior
      this._pokeService.getPokemonSpecie(pokeId).subscribe(specieData => {
        this.pokeDetails.push(specieData);
      });
    });
  }

  //Obtiene la descripcion del pokemon en español
  getDescripcion(pokeId: string) {
    this._pokeService.getPokemonSpecie(pokeId).subscribe(data => {
      let entrada = data.flavor_text_entries.find(entry => entry.language.name === 'es');
      if (entrada) {
        this.descripcion = entrada.flavor_text.replace(/\\n/g, ' ');
      } else {
        this.descripcion = 'No se encontró una descripcion al español.';
      }
    });
  }

  //Quita el boton de anterior si el id es 1
  pokeById0() {
    if (Number(this.id) === 1) {
      this.anteriorBtn = false;
    }
  }

}
