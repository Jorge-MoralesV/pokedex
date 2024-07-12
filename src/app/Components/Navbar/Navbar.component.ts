import { Component, OnInit, ViewChild } from '@angular/core';
import { Regions } from 'src/app/interfaces/regiones';
import { PokemonListComponent } from 'src/app/pages/pokemon-list/pokemon-list.component';
import { ServiceNameService } from 'src/app/services/funciones.service';

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
    { nombre: 'Galar', inicio: 810, fin: 905 }
  ];

  searchTerm: string = '';
  home: boolean = true;

  constructor(private service: ServiceNameService) { }

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
    console.log('Navbar: ' + arg0 + ' - ' + arg1);
  }

  searchPokemon() {
    if (location.href.includes('pokemon-details/')) {
      const newUrl = this.url.split('/');
      const remplazo = newUrl[newUrl.length - 1];
      location.replace(location.href.replace(remplazo, this.searchTerm));
    } else if (location.href.includes(this.url)) {
      this.service.variable$.next(this.searchTerm);
    }
  }

}
