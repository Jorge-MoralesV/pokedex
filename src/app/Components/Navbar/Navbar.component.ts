import { Component } from '@angular/core';
import { Regions } from 'src/app/interfaces/regiones';
import { PokemonListComponent } from 'src/app/pages/pokemon-list/pokemon-list.component';
import { PokemonService } from 'src/app/services/poke.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './Navbar.component.html',
  styleUrls: ['./Navbar.component.css'],
})

export class NavbarComponent {

  constructor(/* private _pokeServ: PokemonService, private list: PokemonListComponent */) { }

  url = 'http://localhost:4200/';

  regiones: Regions[] = [];

  regionesInfo = [
    { nombre: 'Kanto', inicio: 1, fin: 151 },
    { nombre: 'Johto', inicio: 152, fin: 251 },
    { nombre: 'Hoenn', inicio: 252, fin: 386 },
    { nombre: 'Sinnoh', inicio: 387, fin: 493 },
    { nombre: 'Teselia', inicio: 494, fin: 649 },
    { nombre: 'Kalos', inicio: 650, fin: 721 },
    { nombre: 'Alola', inicio: 722, fin: 809 },
    { nombre: 'Galar', inicio: 810, fin: 905 }
  ];

  searchTerm: string = '';

  getPokemonRegion(arg0: number, arg1: number) {
    //Llamar metodo desde PokemonListComponent
    /* this.list.getPokemonRegion(arg0, arg1); */
  }

  searchPokemon() {
    if (location.href.includes(this.url + 'pokemon-details/')) {
      console.log(location.replace(this.url + 'pokemon-details/' + this.searchTerm));
    } else if (location.href.includes(this.url)) {
      //Llamar metodo desde PokemonListComponent
      /*  this.list.searchPokemon(this.searchTerm); */
    }
  }

}
