import { Sprites, Species } from './../../interfaces/pokemon';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PokemonService } from 'src/app/services/poke.service';
import { PokemonApi } from 'src/app/interfaces/pokemon';
import { PokemonSpecies } from 'src/app/interfaces/pokemonSpecies';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})

export class PokemonDetailsComponent implements OnInit {
  id: string | null;
  pokemon: PokemonApi[] = [];
  pokeDetails: PokemonSpecies[] = [];
  descripcion: string | undefined;

  constructor(private router: Router, private aRouter: ActivatedRoute, private _pokeService: PokemonService) {
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getPokemonInfo();
    this.getDetails();
    this.getDescripcion();
  }

  getPokemonInfo() {
    const pokeId = this.id + '';
    this._pokeService.getPokemonDetails(pokeId).subscribe(data => {
      this.pokemon.push(data);
    });
  }

  getDetails() {
    const pokeId = this.id + '';
    this._pokeService.getPokemonSpecie(pokeId).subscribe(data => {
      this.pokeDetails.push(data);
    })
  }

  getDescripcion() {
    const pokeId = this.id + '';
    this._pokeService.getPokemonSpecie(pokeId).subscribe(data => {
      let entrada = data.flavor_text_entries.find(entry => entry.language.name === 'es');
      if (entrada) {
        this.descripcion = entrada.flavor_text.replace(/\\n/g, ' ');
      } else {
        this.descripcion = 'No se encontró una descripcion al español.';
      }
    });
  }


}
