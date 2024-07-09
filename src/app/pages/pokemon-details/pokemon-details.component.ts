import { Sprites, Species } from './../../interfaces/pokemon';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PokemonService } from 'src/app/services/poke.service';
import { PokemonApi } from 'src/app/interfaces/pokemon';
import { PokemonSpecies } from 'src/app/interfaces/pokemonSpecies';
import { NavbarComponent } from 'src/app/Components/Navbar/Navbar.component';

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
  sprite: string | undefined;
  anteriorBtn = true;
  public filteredPokemons: PokemonApi[] = [];

  constructor(private aRouter: ActivatedRoute, private _pokeService: PokemonService) {
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getPokemonInfo(this.id + '');
    this.getDetails(this.id + '');
    this.getDescripcion(this.id + '');
    this.btnAnterior();
  }

  getPokemonInfo(pokeId: string) {
    this._pokeService.getPokemonDetails(pokeId).subscribe(data => {
      this.pokemon.push(data);
    });
  }

  getDetails(pokeId: string) {
    this._pokeService.getPokemonSpecie(pokeId).subscribe(data => {
      this.pokeDetails.push(data);
    })
  }

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

  btnAnterior() {
    if (Number(this.id) === 1) {
      this.anteriorBtn = false;
    }
  }

}
