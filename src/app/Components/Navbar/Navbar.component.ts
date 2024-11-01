import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { FuncionsService } from 'src/app/services/funciones.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './Navbar.component.html',
  styleUrls: ['./Navbar.component.css'],
})

export class NavbarComponent implements OnInit {

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

  url: string = '';
  searchTerm: string = '';
  home: boolean = true;

  constructor(
    private service: FuncionsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.url = this.router.url;
    })

    this.updateHomeOrDetails();
  }

  /** Verifica si esta en la lista o en los detalles */
  updateHomeOrDetails() {
    this.home = !this.router.url.includes('pokemon-details/');
  }

  navigateToRegion(region: any) {
    this.router.navigate([region.nombre, region.inicio, region.fin]);
  }

  searchPokemon() {
    //Si se encuntra en los detalles del pokemon
    if (this.router.url.includes('pokemon-details/')) {
      /** Separa la url en un arreglo */
      const newUrl = this.router.url.split('/');
      /** Guarda el ultimo valor del arreglo */
      const remplazo = newUrl[newUrl.length - 1];
      /** Remplaza el valor de la url por el nuevo valor */
      const updateUrl = this.router.url.replace(remplazo, this.searchTerm);
      /** Redirige a la nueva url */
      this.router.navigateByUrl(updateUrl);
      //Si se encuentra en la lista de pokemons
    } else if (this.home) {
      this.service.valorBusqueda.next(this.searchTerm.trim().toLowerCase());
    }
  }

}
