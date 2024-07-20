import { FlavorTextEntry } from './../../interfaces/pokemonSpecies';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/poke.service';
import { PokemonApi } from 'src/app/interfaces/pokemon';
import { PokemonSpecies } from 'src/app/interfaces/pokemonSpecies';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})

export class PokemonDetailsComponent implements OnInit {

  pokemon: PokemonApi[] = [];
  pokeDetails: PokemonSpecies[] = [];
  public filteredPokemons: PokemonApi[] = [];
  id: string | null;
  descripcion: string | undefined;
  objetos: string[] = [];
  sprite: string | undefined;
  anteriorBtn = true;
  haveItem = true;

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
