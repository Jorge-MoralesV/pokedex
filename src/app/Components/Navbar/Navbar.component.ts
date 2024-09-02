import { Component, OnInit } from '@angular/core';
import { Regions } from 'src/app/interfaces/regiones';
import { FuncionsService } from 'src/app/services/funciones.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './Navbar.component.html',
  styleUrls: ['./Navbar.component.css'],
})

export class NavbarComponent implements OnInit {

  url = location.href;

  regiones: Regions[] = [];

  regionesInfo = [
    { nombre: 'Kanto', inicio: 1, fin: 151 },
    { nombre: 'Johto', inicio: 152, fin: 251 },
    { nombre: 'Hoenn', inicio: 252, fin: 386 },
    { nombre: 'Sinnoh', inicio: 387, fin: 493 },
    { nombre: 'Teselia', inicio: 494, fin: 649 },
    { nombre: 'Kalos', inicio: 650, fin: 721 },
    { nombre: 'Alola', inicio: 722, fin: 809 },
    { nombre: 'Galar', inicio: 810, fin: 905 },
    { nombre: 'Paldea', inicio: 906, fin: 1025 },
  ];

  searchTerm: string = '';
  home: boolean = true;

  constructor(private service: FuncionsService) { }

  ngOnInit(): void {
    this.homeOrDetails();
  }

  homeOrDetails() {
    if (location.href.includes('pokemon-details/')) {
      this.home = false;
    } else {
      this.home = true;
    }
  }

  getPokemonRegion(arg0: number, arg1: number) {
    this.service.start.next(arg0);
    this.service.end.next(arg1);
  }

  searchPokemon() {
    //Si se encuntra en los detalles del pokemon
    if (location.href.includes('pokemon-details/')) {
      const newUrl = this.url.split('/');
      const remplazo = newUrl[newUrl.length - 1];
      location.replace(location.href.replace(remplazo, this.searchTerm));
      //Si se encuentra en la lista de pokemons
    } else if (location.href.includes(this.url)) {
      this.service.variable$.next(this.searchTerm);
    }
  }

}
