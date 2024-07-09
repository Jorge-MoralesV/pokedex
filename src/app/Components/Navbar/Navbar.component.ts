import { Component } from '@angular/core';
import { PokemonApi } from 'src/app/interfaces/pokemon';
import { PokemonDetailsComponent } from 'src/app/pages/pokemon-details/pokemon-details.component';
import { PokemonListComponent } from 'src/app/pages/pokemon-list/pokemon-list.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './Navbar.component.html',
  styleUrls: ['./Navbar.component.css'],
})

export class NavbarComponent {

  constructor() { }

  searchTerm: string = '';
  getPokemonRegion(arg0: number, arg1: number) {
    /* this.list.getPokemonRegion(arg0, arg1); */
  }

  searchPokemon() {
    if (location.href.includes('http://localhost:4200/pokemon-details/')) {
      console.log(location.replace('http://localhost:4200/pokemon-details/' + this.searchTerm));
    } else if (location.href.includes('http://localhost:4200/')) {
      console.log('Pagina principal');
    }

  }
}
