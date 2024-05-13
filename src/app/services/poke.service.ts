import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonApi } from '../interfaces/pokemon';
import { PokemonSpecies } from '../interfaces/pokemonSpecies';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })


export class PokemonService {

  private apiUrl: string = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getPokemonList(limit: number): Observable<PokemonApi> {
    return this.http.get<PokemonApi>(`${this.apiUrl}/pokemon?limit=${limit}`);
  }

  getPokemonDetails(id: string): Observable<PokemonApi> {
    return this.http.get<PokemonApi>(`${this.apiUrl}/pokemon/${id}`);
  }

  getPokemonSpecie(id: string): Observable<PokemonSpecies> {
    return this.http.get<PokemonSpecies>(`${this.apiUrl}/pokemon-species/${id}`);
  }

/*   getRegions(): Observable<PokemonApi> {
    return this.http.get<PokemonApi>(`${this.apiUrl}/region/1`)
  }

  getPokemonByRegion(region: number): Observable<any> {
    const url = `${this.apiUrl}/pokemon?offset=0&region=${region}`; // Cambia el límite según la región
    return this.http.get(url);
  } */

}
